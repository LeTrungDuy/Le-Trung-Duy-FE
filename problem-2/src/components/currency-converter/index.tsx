import { useEffect, useState } from "react";
import Button from "@/components/button";
import Icon from "@/components/icon";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import { coins } from "../../assets/mock-data";
import "./index.css";

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("ETH");
  const [toCurrency, setToCurrency] = useState<string>("USDC");
  const [amount, setAmount] = useState("1");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [shouldConvert, setShouldConvert] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const currencies = coins.map((coin) => coin.currency);

  const getCurrencyPrice = (currency: string) => {
    const coin = coins.find((coin) => coin.currency === currency);
    return coin ? coin.price : 0;
  };

  const convertCurrency = () => {
    const numericAmount = Number(amount);

    if (numericAmount <= 0 || isNaN(numericAmount)) {
      setError("Amount must be a valid number greater than zero");
      setConvertedAmount(null);
      setShouldConvert(false);
      return;
    }

    const fromPrice = getCurrencyPrice(fromCurrency);
    const toPrice = getCurrencyPrice(toCurrency);
    const result = (numericAmount * fromPrice) / toPrice;

    setError("");
    setConvertedAmount(result);
    setShouldConvert(false);
  };

  useEffect(() => {
    if (shouldConvert) {
      setIsLoading(true);
      setTimeout(() => {
        convertCurrency();
        setIsLoading(false);
      }, 800);
    }
  }, [shouldConvert]);

  useEffect(() => {
    setConvertedAmount(null);
    setError("");
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = (value: string) => {
    setAmount(value);

    if (Number(value) > 0) {
      setError("");
    }
  };

  const handleConvertClick = () => {
    setShouldConvert(true);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setShouldConvert(true);
  };

  return (
    <div className="currency-converter">
      <h1>Currency Swap</h1>

      <div className="currency-converter-wrapper">
        <Dropdown
          label="From:"
          options={currencies}
          value={fromCurrency}
          onChange={setFromCurrency}
        />
        <Button
          className="currency-converter-swap"
          typeButton="icon"
          icon={<Icon name="swap" />}
          onClick={swapCurrencies}
        />
        <Dropdown
          label="To:"
          options={currencies}
          value={toCurrency}
          onChange={setToCurrency}
        />
      </div>
      <div className="currency-converter-amount">
        <p>Amount: </p>
        <Input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          size="small"
        />
        {error && <p className="currency-converter-error">{error}</p>}
      </div>

      <div className="currency-converter-result">
        <Button text="Convert" onClick={handleConvertClick} />
        {isLoading && (
          <p className="currency-converter-loading">Converting...</p>
        )}
        {convertedAmount !== null && !isLoading && !error && (
          <div>
            <h3>Converted Amount</h3>
            <p>
              {convertedAmount.toFixed(8)} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
