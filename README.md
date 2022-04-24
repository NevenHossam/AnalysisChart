# AnalysisChart

#Dividing the problem into sub-problems:
-	Dropdown lists depend on each other 
o	Initially, the first choice of each one will be chosen by default until you choose a new option which will be saved in local storage to cache your last choice 
-	Filter data based on chosen dropdown options 
o	Initially will be filtered by the first option in each DDL
-	Render filtered list on chart 
o	Apply some configuration on the chart 
-	Change DDL and listen to that change in the filter data and the chart 
-	Build data for the summary part
-	Handle on click chart point display its details in another page
o	And saving the state of DDLs and chart 

#Components:
-	Analytic-chart:
o	This component mainly is for the line chart 
o	Functionality:
	Create a chart with some configuration 
	Listen to filtered data list based on DDL selection 
•	Sort this list by x-axis (months)
•	Map this list into chart objects 
•	(getRandomColor) function to get each time a new different list of colors based on the data length (each line in the chart will have a different color)
	(onChartClick) function to navigate to another page (chart-point-details) with data object id to list its details 
	Handle show and hide lines in the chart (based on an event that fired from the (chart summary) component and emitted the label that needs to be toggled)
-	Chart-point-details:
o	The button in the analytic-chart component will navigate to this component with an id in the request URL
	Use this id to filter the chart data list to get the object and display its data
-	Chart-summary:
o	Whenever the chart data changes, will reflect that change in the summary part
	Data includes: total lessons per the camp, each school in this camp with its sum of lessons 
o	Show/hide button beside each school to emit the label name which we need to toggle (analytic-chart component subscribes to this to toggle it in the chart) 
-	Dropdown-list:
o	We have 3 dropdown lists in the application (Country, Camp, School)
o	All have the same criteria and functionality so we have one component only will be binded on and rendered in 3 different places with different data
	So we have an enum for the 3 types to handle each case 
	And an interface made contains: 
•	Dropdown data list 
•	Dropdown changed type (which DDL has fired the change event) 
o	Like the country has been changed to Tunisia, then the country is the dropdown changed type 
•	Dropdown reflected type (which DDL will be affected by this change) 
o	The country has changed but we will affect the camps as we will get the camps that related to this country
•	Selected-value: the changed new value
o	On change dropdown will perform an action based on the DDL type
	If the changed DDL type was country:
•	We will get the camps of this country and emit those values 
o	(dashboard component) subscribes to this list will also set the first camp is selected and get its schools list
	If camps:
•	We will get the schools list related to this camp 
	 If schools:
•	Will emit the changed type and new value only to (dashboard component)
-	Dashboard:
o	Is the parent component for: 
	Country DLL
	Camp DLL
	School DDL (has ‘show all’ option that displays all schools in the chosen camp)
	Analytic-chart 
	Chart-summary
o	Initializes the chart with the first option in each DDL (First country, first camp related to that country, and show all schools option)
	And save those choices in local storage 
o	As mentioned before in the dropdown list point the dashboard subscribes to the changed values in DDLs to fetch the related data 

#Services:
-	Chart-data: handle and get data from JSON file
o	get DDL distinct data 
o	filter data using 3 chosen options 
o	calculate and get chart data list summary to be emitted by (dashboard component) to (chart-summary component)
