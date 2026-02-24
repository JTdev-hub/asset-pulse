/**
 * Popular US-listed ETFs.
 * Covers broad market, international, bonds, sectors, dividends, commodities,
 * thematic, and crypto ETFs.
 */

type InstrumentData = {
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  currency: string;
  country: string;
};

const e = (symbol: string, name: string, exchange: string): InstrumentData => ({
  symbol,
  name,
  type: "ETF",
  exchange,
  currency: "USD",
  country: "US",
});

export const US_ETFS: InstrumentData[] = [
  // ── Broad US Market ────────────────────────────────────────────────────────
  e("SPY",   "SPDR S&P 500 ETF Trust",                          "NYSE Arca"),
  e("VOO",   "Vanguard S&P 500 ETF",                            "NYSE Arca"),
  e("IVV",   "iShares Core S&P 500 ETF",                        "NYSE Arca"),
  e("VTI",   "Vanguard Total Stock Market ETF",                 "NYSE Arca"),
  e("ITOT",  "iShares Core S&P Total US Stock Market ETF",      "NYSE Arca"),
  e("SPLG",  "SPDR Portfolio S&P 500 ETF",                      "NYSE Arca"),
  e("RSP",   "Invesco S&P 500 Equal Weight ETF",                "NYSE Arca"),
  e("SCHB",  "Schwab US Broad Market ETF",                      "NYSE Arca"),

  // ── Growth & Large-Cap ─────────────────────────────────────────────────────
  e("QQQ",   "Invesco QQQ Trust",                               "NASDAQ"),
  e("QQQM",  "Invesco NASDAQ 100 ETF",                          "NASDAQ"),
  e("VUG",   "Vanguard Growth ETF",                             "NYSE Arca"),
  e("IWF",   "iShares Russell 1000 Growth ETF",                 "NYSE Arca"),
  e("SCHG",  "Schwab US Large-Cap Growth ETF",                  "NYSE Arca"),
  e("SPYG",  "SPDR Portfolio S&P 500 Growth ETF",               "NYSE Arca"),
  e("MGK",   "Vanguard Mega Cap Growth ETF",                    "NYSE Arca"),

  // ── Value ──────────────────────────────────────────────────────────────────
  e("VTV",   "Vanguard Value ETF",                              "NYSE Arca"),
  e("IVE",   "iShares S&P 500 Value ETF",                       "NYSE Arca"),
  e("SCHV",  "Schwab US Large-Cap Value ETF",                   "NYSE Arca"),

  // ── Mid & Small Cap ────────────────────────────────────────────────────────
  e("MDY",   "SPDR S&P MidCap 400 ETF Trust",                   "NYSE Arca"),
  e("IJH",   "iShares Core S&P Mid-Cap ETF",                    "NYSE Arca"),
  e("VO",    "Vanguard Mid-Cap ETF",                            "NYSE Arca"),
  e("IWM",   "iShares Russell 2000 ETF",                        "NYSE Arca"),
  e("IJR",   "iShares Core S&P Small-Cap ETF",                  "NYSE Arca"),
  e("VB",    "Vanguard Small-Cap ETF",                          "NYSE Arca"),

  // ── International ──────────────────────────────────────────────────────────
  e("VEA",   "Vanguard FTSE Developed Markets ETF",             "NYSE Arca"),
  e("EFA",   "iShares MSCI EAFE ETF",                           "NYSE Arca"),
  e("VWO",   "Vanguard FTSE Emerging Markets ETF",              "NYSE Arca"),
  e("EEM",   "iShares MSCI Emerging Markets ETF",               "NYSE Arca"),
  e("VXUS",  "Vanguard Total International Stock ETF",          "NASDAQ"),
  e("ACWI",  "iShares MSCI ACWI ETF",                           "NASDAQ"),
  e("VEU",   "Vanguard FTSE All-World ex-US ETF",               "NYSE Arca"),
  e("IXUS",  "iShares Core MSCI Total International Stock ETF", "NASDAQ"),

  // ── Bonds ──────────────────────────────────────────────────────────────────
  e("AGG",   "iShares Core US Aggregate Bond ETF",              "NYSE Arca"),
  e("BND",   "Vanguard Total Bond Market ETF",                  "NASDAQ"),
  e("BNDX",  "Vanguard Total International Bond ETF",           "NASDAQ"),
  e("SHY",   "iShares 1-3 Year Treasury Bond ETF",              "NASDAQ"),
  e("IEF",   "iShares 7-10 Year Treasury Bond ETF",             "NASDAQ"),
  e("TLT",   "iShares 20+ Year Treasury Bond ETF",              "NASDAQ"),
  e("HYG",   "iShares iBoxx High Yield Corporate Bond ETF",     "NYSE Arca"),
  e("LQD",   "iShares iBoxx Investment Grade Corporate Bond ETF","NYSE Arca"),
  e("VCSH",  "Vanguard Short-Term Corporate Bond ETF",          "NASDAQ"),
  e("VCIT",  "Vanguard Intermediate-Term Corporate Bond ETF",   "NASDAQ"),
  e("TIPS",  "iShares TIPS Bond ETF",                           "NYSE Arca"),
  e("SCHP",  "Schwab US TIPS ETF",                              "NYSE Arca"),

  // ── Dividends & Income ─────────────────────────────────────────────────────
  e("SCHD",  "Schwab US Dividend Equity ETF",                   "NYSE Arca"),
  e("VIG",   "Vanguard Dividend Appreciation ETF",              "NYSE Arca"),
  e("VYM",   "Vanguard High Dividend Yield ETF",                "NYSE Arca"),
  e("DGRO",  "iShares Core Dividend Growth ETF",                "NYSE Arca"),
  e("DVY",   "iShares Select Dividend ETF",                     "NASDAQ"),
  e("HDV",   "iShares Core High Dividend ETF",                  "NYSE Arca"),
  e("JEPI",  "JPMorgan Equity Premium Income ETF",              "NYSE Arca"),
  e("JEPQ",  "JPMorgan Nasdaq Equity Premium Income ETF",       "NASDAQ"),
  e("XYLD",  "Global X S&P 500 Covered Call ETF",               "NYSE Arca"),

  // ── Sector SPDRs ───────────────────────────────────────────────────────────
  e("XLK",   "Technology Select Sector SPDR Fund",              "NYSE Arca"),
  e("XLF",   "Financial Select Sector SPDR Fund",               "NYSE Arca"),
  e("XLV",   "Health Care Select Sector SPDR Fund",             "NYSE Arca"),
  e("XLE",   "Energy Select Sector SPDR Fund",                  "NYSE Arca"),
  e("XLI",   "Industrial Select Sector SPDR Fund",              "NYSE Arca"),
  e("XLP",   "Consumer Staples Select Sector SPDR Fund",        "NYSE Arca"),
  e("XLY",   "Consumer Discretionary Select Sector SPDR Fund",  "NYSE Arca"),
  e("XLU",   "Utilities Select Sector SPDR Fund",               "NYSE Arca"),
  e("XLRE",  "Real Estate Select Sector SPDR Fund",             "NYSE Arca"),
  e("XLB",   "Materials Select Sector SPDR Fund",               "NYSE Arca"),
  e("XLC",   "Communication Services Select Sector SPDR Fund",  "NYSE Arca"),

  // ── Technology & Semiconductors ────────────────────────────────────────────
  e("VGT",   "Vanguard Information Technology ETF",             "NYSE Arca"),
  e("SOXX",  "iShares Semiconductor ETF",                       "NASDAQ"),
  e("SMH",   "VanEck Semiconductor ETF",                        "NASDAQ"),
  e("TECL",  "Direxion Daily Technology Bull 3X Shares",        "NYSE Arca"),

  // ── Thematic (ARK) ─────────────────────────────────────────────────────────
  e("ARKK",  "ARK Innovation ETF",                              "NYSE Arca"),
  e("ARKW",  "ARK Next Generation Internet ETF",                "NYSE Arca"),
  e("ARKG",  "ARK Genomic Revolution ETF",                      "NYSE Arca"),
  e("ARKF",  "ARK Fintech Innovation ETF",                      "NYSE Arca"),
  e("ARKX",  "ARK Space Exploration & Innovation ETF",          "NYSE Arca"),

  // ── Clean Energy ───────────────────────────────────────────────────────────
  e("ICLN",  "iShares Global Clean Energy ETF",                 "NASDAQ"),
  e("TAN",   "Invesco Solar ETF",                               "NASDAQ"),
  e("FAN",   "First Trust Global Wind Energy ETF",              "NYSE Arca"),
  e("QCLN",  "First Trust NASDAQ Clean Edge Green Energy ETF",  "NASDAQ"),

  // ── Real Estate ────────────────────────────────────────────────────────────
  e("VNQ",   "Vanguard Real Estate ETF",                        "NYSE Arca"),
  e("IYR",   "iShares US Real Estate ETF",                      "NYSE Arca"),

  // ── Commodities ────────────────────────────────────────────────────────────
  e("GLD",   "SPDR Gold Shares",                                "NYSE Arca"),
  e("IAU",   "iShares Gold Trust",                              "NYSE Arca"),
  e("SLV",   "iShares Silver Trust",                            "NYSE Arca"),
  e("PDBC",  "Invesco Optimum Yield Diversified Commodity Strategy ETF", "NASDAQ"),
  e("DBC",   "Invesco DB Commodity Index Tracking Fund",        "NYSE Arca"),
  e("USO",   "United States Oil Fund LP",                       "NYSE Arca"),
  e("UNG",   "United States Natural Gas Fund LP",               "NYSE Arca"),

  // ── Bitcoin & Crypto ETFs ──────────────────────────────────────────────────
  e("IBIT",  "iShares Bitcoin Trust ETF",                       "NASDAQ"),
  e("FBTC",  "Fidelity Wise Origin Bitcoin Fund",               "NYSE Arca"),
  e("BITB",  "Bitwise Bitcoin ETF",                             "NYSE Arca"),
  e("GBTC",  "Grayscale Bitcoin Trust ETF",                     "NYSE Arca"),
  e("ETHA",  "iShares Ethereum Trust ETF",                      "NASDAQ"),
  e("FETH",  "Fidelity Ethereum Fund",                          "NYSE Arca"),
];
