/* global Catpow console */
Catpow.datetime={
	DAYS:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
	FULL_DAYS:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	MONTHES:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	FULL_MONTHES:['January','February','March','April','May','June','July','August','September','October','November','December'],
	getDateTimeString:function(dateTimeObj,format='Y-m-d H:i:s'){
		return format.replace(/[dDjlNSwzWFmMntLoXxYyaABgGhHisuveIOPpTZcrU]/g,(matches)=>{
			switch(matches[0]){
				case 'd':return dateTimeObj.getDate().toString().padStart(2,'0');
				case 'D':return Catpow.datetime.DAYS[dateTimeObj.getDay()];
				case 'j':return dateTimeObj.getDate();
				case 'l':return Catpow.datetime.FULL_DAYS[dateTimeObj.getDay()];
				case 'N':return (dateTimeObj.getDay()+6)%7+1;
				case 'S':return ['st','nd','rd'][dateTimeObj.getDate()-1] || 'th';
				case 'w':return dateTimeObj.getDay();
				case 'z':return Catpow.datetime.getDaysInYear(dateTimeObj);
				case 'W':return Catpow.datetime.getWeekIndexInYear(dateTimeObj).toString().padStart(2,'0');
				case 'F':return Catpow.datetime.FULL_MONTHES[dateTimeObj.getMonth()];
				case 'm':return (dateTimeObj.getMonth()+1).toString().padStart(2,'0');
				case 'M':return Catpow.datetime.MONTHES[dateTimeObj.getMonth()];
				case 'n':return dateTimeObj.getMonth()+1;
				case 't':return Catpow.datetime.getLastDateOfMonth(dateTimeObj);
				case 'L':return Catpow.datetime.isLeapYear(dateTimeObj)?1:0;
				case 'o':return (new Date(dateTimeObj.getTime()-((dateTimeObj.getDay()+6)%7-3)*8.64e+7)).getFullYear();
				case 'X':{const y=dateTimeObj.getFullYear();return y>=0?'+'+y:y;}
				case 'x':return dateTimeObj.getFullYear();
				case 'Y':return dateTimeObj.getFullYear();
				case 'y':return dateTimeObj.getFullYear().toString().slice(-2);
				case 'a':return dateTimeObj.getHours()<12?'am':'pm';
				case 'A':return dateTimeObj.getHours()<12?'AM':'PM';
				case 'B':return Math.floor(((dateTimeObj.getTime()+3.6e+6)%8.64e+7+8.64e+7)%8.64e+7/8.64e+4);
				case 'g':return (dateTimeObj.getHours()+11)%12+1;
				case 'G':return dateTimeObj.getHours();
				case 'h':return ((dateTimeObj.getHours()+11)%12+1).toString().padStart(2,'0');
				case 'H':return dateTimeObj.getHours().toString().padStart(2,'0');
				case 'i':return dateTimeObj.getMinutes().toString().padStart(2,'0');
				case 's':return dateTimeObj.getSeconds().toString().padStart(2,'0');
				case 'u':return ((dateTimeObj.getTime()%1000)*1000).toString().padStart(6,'0');
				case 'v':return (dateTimeObj.getTime()%1000).toString().padStart(3,'0');
				case 'e':return Intl.DateTimeFormat().resolvedOptions().timeZone;
				case 'I':return Catpow.datetime.isInSummerTime(dateTimeObj)?1:0;
				case 'O':return Catpow.datetime.getTimeDifference(dateTimeObj,false);
				case 'P':return Catpow.datetime.getTimeDifference(dateTimeObj);
				case 'p':{const d=Catpow.datetime.getTimeDifference(dateTimeObj);return (d==='+00:00')?'z':d;}
				case 'T':return dateTimeObj.getTimezoneOffset();
				case 'Z':return dateTimeObj.getTimezoneOffset()*-60;
				case 'c':{
					const f=Catpow.datetime.getDateTimeString;
					return f(dateTimeObj,'Y-m-d')+'T'+f(dateTimeObj,'H:i:sP');
				}
				case 'r':return Catpow.datetime.getDateTimeString(dateTimeObj,'D, d M Y H:i:s O')
				case 'U':return parseInt(dateTimeObj.getTime().toString().slice(0,-3));
			}
		});
	},
	isLeapYear:(dateTimeObj)=>{
		const y=dateTimeObj.getFullYear();
		return y%4===0 && (y%100!==0 || y%400===0);
	},
	isInSummerTime:(dateTimeObj)=>{
		const org=dateTimeObj.getTimezoneOffset();
		const d2=new Date(dateTimeObj);
		d2.setMonth(dateTimeObj.getMonth()+6);
		return org !== d2.getTimezoneOffset();
	},
	getTimeDifference:(dateTimeObj,withColon=true)=>{
		const diff=dateTimeObj.getTimezoneOffset()*-1;
		const pos=diff>=0;
		const val=Math.abs(diff);
		return (pos?'+':'-')+(Math.floor(val/60).toString().padStart(2,'0'))+(withColon?':':'')+((val%60).toString().padStart(2,'0'));
	},
	getLastDateOfMonth:(dateTimeObj)=>(new Date(dateTimeObj.getFullYear(),dateTimeObj.getMonth()+1,0)).getDate(),
	getTimeInDay:(dateTimeObj)=>dateTimeObj.getTime()-(new Date(dateTimeObj.getFullYear(),dateTimeObj.getMonth(),dateTimeObj.getDate(),0,0,0)).getTime(),
	getTimeInYear:(dateTimeObj)=>dateTimeObj.getTime()-(new Date(dateTimeObj.getFullYear(),0,1)).getTime(),
	getDaysInYear:(dateTimeObj)=>Math.floor(Catpow.datetime.getTimeInYear(dateTimeObj)/8.64e+7),
	getWeekIndexInYear:(dateTimeObj)=>{
		const d1=new Date(dateTimeObj.getTime());
		d1.setDate(d1.getDate()-(d1.getDay()+6)%7+3);
		const d2=new Date(d1.getTime());
		d2.setMonth(0);d2.setDate(1);
		return Math.ceil((d1.getTime()-d2.getTime()+1)/6.048e+8);
	}
};