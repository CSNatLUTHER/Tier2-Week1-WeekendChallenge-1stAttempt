$( document ).ready(onReady)

function onReady(){
   $( "#submitButton").on ('click', getEmployeeData );
}
// create row counter
    let counter = 1000;
// create column counter
    let subCounter = 1;
// create unique ID for each table field
    let idCounter = counter + subCounter;
// create counter for highlighting rows
    let highlight = 0;
// create employee object to store enteries
    let employeeData = {
        fname:'',
        lname:'',
        ID:0,
        title:'',
        salary:0
    };
// format salary number to currency
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });
// variable to store total salary spend
    let salarySpend = 0;
// create variable to calculate monthly spend
    let monthlySalarySpend = salarySpend/12;

// function to set employeeData object property values
    function getEmployeeData(){
        employeeData.fname = $('#fName').val()
        employeeData.lname = $('#lName').val()
        employeeData.ID = $('#employeeID').val()
        employeeData.title = $('#employeeTitle').val()
        employeeData.salary = ($('#annualSalary').val())*1
        addEmployeeData();
    } // end getEmployeeData function

// fucntion to push employeeData object infromation into table on DOM
    function addEmployeeData(){
            $("#employeeTable").append(
                `<tr id=${counter}>
                        <td id=${idCounter}>${employeeData.fname}</td>
                        ${subCounter++}
                        ${idCounter = counter + subCounter}
                        <td id=${idCounter}>${employeeData.lname}</td>
                        ${subCounter++}
                        ${idCounter = counter + subCounter}
                        <td id=${idCounter}>${employeeData.ID}</td>
                        ${subCounter++}
                        ${idCounter = counter + subCounter}
                        <td id=${idCounter}>${employeeData.title}</td>
                        ${subCounter++}
                        ${idCounter = counter + subCounter}
                        <td id=${idCounter}>${formatter.format(employeeData.salary)}</td>
                        ${subCounter++}
                        ${idCounter = counter + subCounter}
                        <td id=${idCounter}><input id=${"deleteRecord" + counter} type="Button" value="Delete"></td>
                </tr>`
            ); 
        // determerine and set row highlight style needed
            if(highlight === 0){
                $("#"+counter).addClass( 'highlight0')
                highlight++
            }
            else{
                $("#"+counter).addClass( 'highlight1')
                highlight = 0
            }
        // update salary spend totals
            salarySpend += employeeData.salary;
            monthlySalarySpend = salarySpend/12;
            $('#monthlySpend').empty()
            $('#monthlySpend').append('Monthly Spend = ' + formatter.format(monthlySalarySpend));
            if(monthlySalarySpend > 5000){
                $('#monthlySpend').css('background-color', 'red')
            }
            else{
                $('#monthlySpend').css('background-color','#ffffff00')
            }

        // target the delete button for row created to run deleteRow function
            $("#deleteRecord" + counter).click ( deleteRow );

        // reset employeeData object properties
            $('#fName').val('')
            $('#lName').val('')
            $('#employeeID').val('')
            $('#employeeTitle').val('')
            $('#annualSalary').val('')

        // increment or reset counter values
            counter+=1000;
            subCounter = 1
    };

// function to delete a row of data
    function deleteRow(rowID){
    //target button ID
        let el = rowID.target.id;
    // target the parent elements of the button
        let el2 = $('#'+ el).parents()
    // capture ID of element to remove (<tr>)
        let el3 = $(el2[1])
    // capture row ID as string value
        let el4 = (el3[0].id);
    // convert row ID string value to a number and counter to grab salary field
        let el5 = Number(el4) + 5
    // set variable to salary ID with #
        let el6 = $("#" + el5)
    // capture the display text of salary field
        let el7 = el6[0].outerText;
    // convert salary to number without $ or ','
        let el8 = Number(el7.replace(/[^0-9.-]+/g,""));
    // update salary spend and monthly spend to reflect removed salary
        salarySpend -= el8
        monthlySalarySpend = salarySpend/12;
        $('#monthlySpend').empty()
        $('#monthlySpend').append('Monthly Spend = ' + formatter.format(monthlySalarySpend));
        if(monthlySalarySpend > 5000){
            $('#monthlySpend').css('background-color', 'red')
        }
        else{
            $('#monthlySpend').css('background-color','#ffffff00')
        }
    // remove deleted row
        el3.empty()
    };