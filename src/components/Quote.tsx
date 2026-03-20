import React, { useEffect } from "react";
import { localQuotes } from "../data/quotes.ts";

type Quote = {
  q: string;
  a: string;
};

const Quote = () => {
  const [quote, setQuote] = React.useState<Quote | null>(null);

  const getLocalQuote = () => {
    const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log("Local Quote fetched:", random);
    return random;
  };

  const fetchQuote = async () => {
    try {
      const res = await fetch(
        "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random",
      );

      const text = await res.text();
      // detect invalid response (rate limit / error)
      if (!text.startsWith("[")) {
        throw new Error("Invalid API response");
      }

      const data = await res.json();

      setQuote(data[0]);
      console.log("API Quote fetched:", data[0]);
    } catch (err) {
      console.log("Using local quote instead");

      const fallback = getLocalQuote();
      setQuote(fallback);
    }
  };

  useEffect(() => {
    fetchQuote();

    const interval = setInterval(fetchQuote, 600000); // fetch a new quote every 6 minutes    360000  60000

    return () => clearInterval(interval); // cleanup the interval on component unmount
  }, []);

  return (
    <div className="card p-2">
      {/* lofi */}
      <div className="ratio ratio-16x9">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1"
          title="Lofi Music"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <h2 className="mt-1">Quote of the Day</h2>

        {quote ? (
          <p>
            "{quote.q}" — {quote.a}
          </p>
        ) : (
          <p>Loading quote...</p>
        )}
      </div>
    </div>
  );
};

export default Quote;
