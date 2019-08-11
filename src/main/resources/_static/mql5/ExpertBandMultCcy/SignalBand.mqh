#include <Expert\ExpertSignal.mqh> 
class CSignalBand : public CExpertSignal
  {
protected:
   CiBands           m_BAND;           // object-oscillator
   CiDEMA            m_DEMA;
   //--- adjusted parameters
   int               m_ma_period;         // the "period" parameter of the oscillator
   double            m_deviation;
   int               m_ma_shift;
   ENUM_APPLIED_PRICE m_applied;       // the "price series" parameter of the oscillator

public:
                     CSignalBand(void);
                    ~CSignalBand(void);
   //--- methods of setting adjustable parameters
   void              PeriodMA(int value) { m_ma_period=value;           }
   void              Deviation(double value) { m_deviation=value;        }
   void              Shift(int value)                  { m_ma_shift=value;         }
   void              Applied(ENUM_APPLIED_PRICE value) { m_applied=value;               }

   //--- method of verification of settings
   virtual bool      ValidationSettings(void);
   //--- method of creating the indicator and timeseries
   virtual bool      InitIndicators(CIndicators *indicators);
   //--- methods of checking if the market models are formed
   virtual int       LongCondition(void);
   virtual int       ShortCondition(void);
   //  virtual bool      IfSetTakeProfit(void);
   //  virtual bool      IfSetStopLoss(void);

protected:
   //--- method of initialization of the oscillator
   bool              InitBAND(CIndicators *indicators);
   bool              InitDEMA(CIndicators *indicators);

   //--- methods of getting data
   double            Base(int ind)                     { return(m_BAND.Base(ind));      }
   double            Upper(int ind)                    { return(m_BAND.Upper(ind));    }
   double            Lower(int ind)                    { return(m_BAND.Lower(ind)); }
   double            Main(int ind)                     { return(m_DEMA.Main(ind)); }

  };
//+------------------------------------------------------------------+
//| Constructor                                                      |
//+------------------------------------------------------------------+
CSignalBand::CSignalBand(void): m_ma_period(20),
                                m_ma_shift(0),
                                m_deviation(2.0),
                                m_applied(PRICE_CLOSE)
  {
//--- initialization of protected data
   m_used_series=USE_SERIES_HIGH+USE_SERIES_LOW+USE_SERIES_CLOSE;
  }
//+------------------------------------------------------------------+
//| Destructor                                                       |
//+------------------------------------------------------------------+
CSignalBand::~CSignalBand(void)
  {
  }
//+------------------------------------------------------------------+
//| Validation settings protected data.                              |
//+------------------------------------------------------------------+
bool CSignalBand::ValidationSettings(void)
  {
   if(!CExpertSignal::ValidationSettings())
      return(false);
   return(true);
  }
//+------------------------------------------------------------------+
//| Create indicators.                                               |
//+------------------------------------------------------------------+
bool CSignalBand::InitIndicators(CIndicators *indicators)
  {
   if(!CExpertSignal::InitIndicators(indicators))
      return(false);
   if(!InitBAND(indicators))
      return(false);
   return(true);
  }
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
bool CSignalBand::InitBAND(CIndicators *indicators)
  {
   if(!indicators.Add(GetPointer(m_BAND)))
     {
      printf(__FUNCTION__+": error adding object");
      return(false);
     }
   if(!m_BAND.Create(m_symbol.Name(),m_period,m_ma_period,m_ma_shift,m_deviation,m_applied))
     {
      printf(__FUNCTION__+": error initializing object");
      return(false);
     }
   return(true);
  }
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
bool CSignalBand::InitDEMA(CIndicators *indicators)
  {
   if(!indicators.Add(GetPointer(m_DEMA)))
     {
      printf(__FUNCTION__+": error adding object");
      return(false);
     }
   if(!m_DEMA.Create(m_symbol.Name(),PERIOD_D1,m_ma_period,m_ma_shift,m_applied))
     {
      printf(__FUNCTION__+": error initializing object");
      return(false);
     }
   return(true);
  }
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
int CSignalBand::LongCondition(void)
  {
   int result=0;
   int idx   =StartIndex();
   double open1=Open(idx);
   double close1=Close(idx);
   double close2=Close(idx+1);
   double upper=Upper(idx);
   double lower=Lower(idx);
   double lower2=Lower(idx+1);
   double width=upper-lower;

   if((close1>lower && close2<lower))//|| (open1<lower && close1>lower))//&& dema1>dema2 && dema2>dema3)
     {
      result=100;
      double p_level=NormalizeDouble(width/2/PriceLevelUnit(),1);
      TakeLevel(p_level*m_takeprofit_mult);
      StopLevel(p_level*m_stoploss_mult);
      m_base_price=close1;

      p_level=NormalizeDouble((upper-close1)/PriceLevelUnit(),1)*m_price_level_ratio;
      if(p_level<m_limit_min)p_level=m_limit_min;
      if(p_level>m_limit_max)p_level=m_limit_max;
      PriceLevel(p_level);
     }
   return(result);
  }
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
int CSignalBand::ShortCondition(void)
  {
   int result=0;
   int idx   =StartIndex();
   double open1=Open(idx);
   double close1=Close(idx);
   double close2=Close(idx+1);
   double upper=Upper(idx);
   double upper2=Upper(idx+1);
   double lower=Lower(idx);
   double width=upper - lower;
   if((close1<upper && close2>upper))// || (open1>upper && close1<upper))//&& dema1<dema2 && dema2<dema3)
     {
      result=100;
      double p_level=NormalizeDouble(width/2/PriceLevelUnit(),1);

      TakeLevel(p_level*m_takeprofit_mult);

      StopLevel(p_level*m_stoploss_mult);

      m_base_price=close1;

      p_level=NormalizeDouble((close1-lower)/PriceLevelUnit(),1)*m_price_level_ratio;
      if(p_level<m_limit_min)p_level=m_limit_min;
      if(p_level>m_limit_max)p_level=m_limit_max;
      PriceLevel(p_level);
     }
   return(result);
  }
//+------------------------------------------------------------------+
