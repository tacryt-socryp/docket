Ext.define("Docket.view.authContainer",{extend:"Ext.Container",config:{itemId:"authContainer",style:"background-color:##2c3e50",listeners:[{fn:"onContainerInitialize",event:"initialize"},{fn:"onAuthContainerDeactivate",event:"deactivate"}]},onContainerInitialize:function(e,t){function i(e){for(var t in e){return false}return true}var n={};var r=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(e,t,r){n[t]=r});if(i(n)){window.location.href="login.html"}else{var s=Ext.getBody().getSize().height,o=Ext.getBody().getSize().width;Ext.create("Docket.view.formPanel");Ext.create("Docket.view.portCarousel");Docket.app.authToken=decodeURI(n.auth);this.generateItems()}},onAuthContainerDeactivate:function(e,t,n,r){e.destroy()},generateItems:function(){var e=this,t=Docket.app.authToken,n="464168127252.apps.googleusercontent.com",r="AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o",i="https://www.googleapis.com/auth/calendar";try{gapi.client.setApiKey(r);gapi.auth.setToken(t)}catch(s){window.location.reload()}gapi.auth.authorize({client_id:n,scope:i,immediate:true},function(t){if(t){gapi.client.load("calendar","v3",function(){var t=gapi.client.calendar.calendarList.list();t.execute(function(t){for(var n=0;n<t.items.length;n++){if(n==t.items.length-1){e.loadData(t.items[n].id,t.items[n].summary,true)}else{e.loadData(t.items[n].id,t.items[n].summary,false)}}})})}})},loadData:function(e,t,n){var r=this,i=new Date,s=Ext.getBody().getSize().height,o=Ext.getBody().getSize().width,u=Ext.ComponentQuery.query("#mainCarousel")[0],a;var f=Docket.app.authToken,l="464168127252.apps.googleusercontent.com",c="AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o",h="https://www.googleapis.com/auth/calendar";var p=[{timeline:"#16a085",box:"#1abc9c"},{timeline:"#2980b9",box:"#3498db"},{timeline:"#8e44ad",box:"#9b59b6"},{timeline:"#27ae60",box:"#31cd73"},{timeline:"#c0392b",box:"#e74c3c"}];i=i.toISOString();gapi.client.setApiKey(c);gapi.auth.setToken(f);gapi.auth.authorize({client_id:l,scope:h,immediate:true},function(s){if(s){gapi.client.load("calendar","v3",function(){var s=gapi.client.calendar.events.list({calendarId:e,singleEvents:true,orderBy:"startTime",timeMin:i,maxResults:70});s.execute(function(s){if(Ext.isDefined(s)&&Ext.isDefined(s.items)&&Ext.isDefined(s.items[0])){if(t.indexOf("birthdays and events")==-1&&t.indexOf("Holidays")==-1){obj=new Docket.view.portContainer;array_i=Ext.ComponentQuery.query("#inlinePortDraw").length-1;a=Ext.ComponentQuery.query("#inlinePortDraw")[array_i];if(array_i>4){array_i=array_i%4}obj.roomText=t;obj.calendarId=e;a.roomText=t;a.backgroundColor="#2c3e50";a.boxColor=p[array_i].box;a.timelineColor=p[array_i].timeline;a.events=s.items;u.add(obj);if(r.getItemId()==Ext.Viewport.getActiveItem().getItemId()){Ext.Viewport.setActiveItem("portCarousel")}}}else{if(n){gapi.client.load("calendar","v3",function(){var n=gapi.client.calendar.events.list({calendarId:"primary",singleEvents:true,orderBy:"startTime",timeMin:i,maxResults:70});n.execute(function(n){obj=new Docket.view.portContainer;array_i=Ext.ComponentQuery.query("#inlinePortDraw").length-1;a=Ext.ComponentQuery.query("#inlinePortDraw")[array_i];if(array_i>4){array_i=array_i%4}u=Ext.ComponentQuery.query("#mainCarousel")[0];obj.roomText=t;obj.calendarId=e;a.roomText=t;a.backgroundColor="#2c3e50";a.boxColor=p[array_i].box;a.timelineColor=p[array_i].timeline;a.events=[];u.add(obj);if(r.getItemId()==Ext.Viewport.getActiveItem().getItemId()){Ext.Viewport.setActiveItem("portCarousel")}})})}}})})}else{window.location.reload()}})}})