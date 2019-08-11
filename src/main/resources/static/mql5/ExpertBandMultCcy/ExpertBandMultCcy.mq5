//+------------------------------------------------------------------+
//|                                                   ExpertBand.mq5 |
//|                                                 Jegan Chen, 2019 |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
//+------------------------------------------------------------------+
//| Include                                                          |
//+------------------------------------------------------------------+
#include "Expert.mqh"
#include "SignalBand.mqh"
#include <Expert\Trailing\TrailingNone.mqh>
#include <Expert\Money\MoneyFixedRisk.mqh>
#include <Expert\Money\MoneyFixedLot.mqh>
#include <Expert\Money\MoneySizeOptimized.mqh>

//---

#define AUDNZD      "AUDNZD"
#define AUDCHF      "AUDCHF"
#define AUDJPY      "AUDJPY"
#define AUDCAD      "AUDCAD"
#define AUDUSD      "AUDUSD"
#define CHFJPY      "CHFJPY"
#define EURUSD      "EURUSD"
#define EURGBP      "EURGBP"
#define EURCHF      "EURCHF"
#define GBPUSD      "GBPUSD"
#define GBPJPY      "GBPJPY"
#define GBPCHF      "GBPCHF"
#define NZDUSD      "NZDUSD"
#define USDCHF      "USDCHF"
#define USDJPY      "USDJPY"
#define USDCAD      "USDCAD"
#define XAGUSD      "XAGUSD"
#define XAUUSD      "XAUUSD"
#define GBPCAD      "GBPCAD"
#define CADCHF      "CADCHF"
#define EURAUD      "EURAUD"
#define EURCAD      "EURCAD"
#define GBPAUD      "GBPAUD"
#define EURJPY      "EURJPY"
#define AUDGBP      "AUDGBP"

//---

//+------------------------------------------------------------------+
//| Inputs                                                           |
//+------------------------------------------------------------------+
//--- inputs for expert
input string Inp_Expert_Title            ="ExpertBandMultCcy";
input int    Expert_MagicNumber          =20190615;
//--- inputs for signal
input double Inp_Money_Risk_Percent=10.0;
input double Inp_Signal_Band_TakeProfit_Mult  =50.0;
input double Inp_Signal_Band_StopLoss_Mult    =10.0;
input int    Inp_Signal_Band_Period=20;
input int    numberOfCurrency=10;
input double Inp_Signal_Band_PriceLevelRatio=0.382;

bool   Inp_Adjust_StopLoss=false;
//input 
int    Inp_Signal_Band_shift=0;
//input 
double Inp_Signal_Band_diviation=2.0;
//input 
double Inp_Signal_Band_LimitMax=40;
//input 
double Inp_Signal_Band_LimitMin=2;
//input 
int    Inp_Money_Type=0;//0 fixed risk; 1 fixed lot, 2 Optimized (by m_decrease_factor)
double Inp_Money_Default_lot=1.0;
//input 
double Inp_Money_Decrease_Facotr=2.0;
bool   Expert_EveryTick=false;
// current stop loss
double current_stoploss_mult; 
CExpert ExtExpert[18];
bool eexp[18]; 
string  valuta[18]=
  {
   EURUSD 
  };
int OnInit()
  {
   current_stoploss_mult=Inp_Signal_Band_StopLoss_Mult;
   if(Period() != PERIOD_H1) return(-1);
   for(int i=0;i<numberOfCurrency; i++)
     {
      eexp[i]=true;
      if(!ExtExpert[i].Init(valuta[i],Period(),Expert_EveryTick,Expert_MagicNumber))
        {
         printf(__FUNCTION__+": error initializing expert");
         ExtExpert[i].Deinit();
         eexp[i]=false;
        }
      CSignalBand *signal=new CSignalBand;
      if(signal==NULL)
        {
         printf(__FUNCTION__+": error creating signal");
         ExtExpert[i].Deinit();
         eexp[i]=false;
        }
      if(!ExtExpert[i].InitSignal(signal))
        {
         printf(__FUNCTION__+": error initializing signal");
         ExtExpert[i].Deinit();
         eexp[i]=false;
        }
      signal.PeriodMA(Inp_Signal_Band_Period);
      signal.Deviation(Inp_Signal_Band_diviation);
      signal.Shift(Inp_Signal_Band_shift);
      
      signal.TakeProfitMult(Inp_Signal_Band_TakeProfit_Mult);
      signal.StopLossMult(current_stoploss_mult);
      signal.PriceLevelRatio(Inp_Signal_Band_PriceLevelRatio);
      signal.Expiration(1);
      signal.LimitMax(Inp_Signal_Band_LimitMax);
      signal.LimitMin(Inp_Signal_Band_LimitMin);
      if(!signal.ValidationSettings())
        {
         printf(__FUNCTION__+": error signal parameters");
         ExtExpert[i].Deinit();
         eexp[i]=false;
        }
      CTrailingNone *trailing=new CTrailingNone;
      if(trailing==NULL)
        {
         printf(__FUNCTION__+": error creating trailing");
         ExtExpert[i].Deinit();
         eexp[i]=false;
        }
      if(!ExtExpert[i].InitTrailing(trailing))
        {
         printf(__FUNCTION__+": error initializing trailing");
         ExtExpert[i].Deinit();
         eexp[i]=false;
        }
      if(!trailing.ValidationSettings())
        {
         printf(__FUNCTION__+": error trailing parameters");
         ExtExpert[i].Deinit();
         eexp[i]=false;
        }
      switch(Inp_Money_Type)
        {
         case 0: FixedRisk(i);break;
         case 1: FixedLots(i);break;
         case 2: SizeOptimized(i);break;
         default: printf(__FUNCTION__+": money init error");
         break;
        }
      if(!ExtExpert[i].InitIndicators())
        {
         printf(__FUNCTION__+": error initializing indicators");
         ExtExpert[i].Deinit();
         eexp[i]=false;
        }

     }
   return(INIT_SUCCEEDED);
  }
int FixedRisk(int n)
  {
   CMoneyFixedRisk *money=new CMoneyFixedRisk;
   if(money==NULL)
     {
      printf(__FUNCTION__+": error creating money");
      ExtExpert[n].Deinit();
      return(-8);
     }
   if(!ExtExpert[n].InitMoney(money))
     {
      printf(__FUNCTION__+": error initializing money");
      ExtExpert[n].Deinit();
      return(-9);
     }
   money.Percent(Inp_Money_Risk_Percent);
   if(!money.ValidationSettings())
     {
      printf(__FUNCTION__+": error money parameters");
      ExtExpert[n].Deinit();
      return(-10);
     }
   return(0);
  }
int FixedLots(int n)
  {
   CMoneyFixedLot *money=new CMoneyFixedLot;
   if(money==NULL)
     {
      printf(__FUNCTION__+": error creating money");
      ExtExpert[n].Deinit();
      return(-8);
     }
   if(!ExtExpert[n].InitMoney(money))
     {
      printf(__FUNCTION__+": error initializing money");
      ExtExpert[n].Deinit();
      return(-9);
     }
   money.Lots(Inp_Money_Default_lot);
   if(!money.ValidationSettings())
     {
      printf(__FUNCTION__+": error money parameters");
      ExtExpert[n].Deinit();
      return(-10);
     }
   return(0);
  }
int SizeOptimized(int n)
  {
   CMoneySizeOptimized *money=new CMoneySizeOptimized;
   if(money==NULL)
     {
      printf(__FUNCTION__+": error creating money");
      ExtExpert[n].Deinit();
      return(-8);
     }
   if(!ExtExpert[n].InitMoney(money))
     {
      printf(__FUNCTION__+": error initializing money");
      ExtExpert[n].Deinit();
      return(-9);
     }
   money.DecreaseFactor(Inp_Money_Decrease_Facotr);
   money.Percent(Inp_Money_Risk_Percent);
   if(!money.ValidationSettings())
     {
      printf(__FUNCTION__+": error money parameters");
      ExtExpert[n].Deinit();
      return(-10);
     }
   return(0);
  }
void OnDeinit(const int reason)
  {
   for(int i=0;i<numberOfCurrency; i++)
     {
      if(eexp[i])
         ExtExpert[i].Deinit();
     }
  }
void OnTick()
  {
   for(int i=0;i<numberOfCurrency; i++)
     {
      if(eexp[i])
        {
         ExtExpert[i].OnTick();
        }
     }

  }
void OnTimer()
  {
   for(int i=0;i<numberOfCurrency; i++)
     {
      if(eexp[i])
         ExtExpert[i].OnTimer();
     }
  } 
void OnTrade()
  {
   for(int i=0;i<numberOfCurrency; i++)
     {
      if(eexp[i])
         ExtExpert[i].OnTrade();
     }
  }
bool OverLossThreshold(int n)
  {
   datetime now=TimeCurrent();
   MqlDateTime timeStr;
   TimeToStruct(now,timeStr);
   timeStr.mon = 01;
   timeStr.day = 01;
   datetime yearbegin=StructToTime(timeStr);

   HistorySelect(yearbegin,now);
   uint     total=HistoryDealsTotal();
   double totalloss= 0;
   double   profit = 0;
   string   symbol;
   long     entry;
   ulong    ticket=0;
   if(total>=30)
     {
      for(uint i=total-1;i>total-30;i--)
        {  
         int num=0;
         if((ticket=HistoryDealGetTicket(i))>0)
           { 
            symbol=HistoryDealGetString(ticket,DEAL_SYMBOL);
            entry =HistoryDealGetInteger(ticket,DEAL_ENTRY);
            profit=HistoryDealGetDouble(ticket,DEAL_PROFIT);
            if(symbol==valuta[n])
              {
               num=num+1;
               if(entry==DEAL_ENTRY_OUT)
                 {
                  totalloss-=profit;
                 }
              }
           }
         if(num>=3)break;
        }
      double balance=AccountInfoDouble(ACCOUNT_BALANCE);
      if(totalloss/balance>NormalizeDouble(Inp_Money_Risk_Percent/100,2))return(true);
     }

   return(false);
  }
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
void AdjustStopLosss(int n)
  {

   if(OverLossThreshold(n))
     {
      ExtExpert[n].LotRatio(0.5);
     }
   else
     {
      ExtExpert[n].LotRatio(1.0);
     }

  }