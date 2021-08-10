
/*
Vijaya Anisetti
vijaya_anisetti@student.uml.edu
File: hw4.js
Assignment: Creating an Interactive Dynamic Table
This file contains most of the work done for this assignment
It contains the code that creates the table and tabs as well as the jquery validation for the user inputs.
it also has functions that enable two-way binding. it also contains the code that allows individual and 
multiple tabs to be deleted
*/



// sliders for all the inputs
/////////////////////////////////////
$(function() {
    $( "#lowcol_slider" ).slider({
       orientation:"horizontal",
       value:0,
       range: [-50, 50],
       min: -50,
       max: 50,
       slide: function( event, ui ) {
          $( "#low_col" ).val( ui.value );
          $("#form").valid();
       }
    });
    $( "#low_col" ).val( $( "#lowcol_slider" ).slider( "value" ) );
    $( "#low_col" ).change(function(){
        $("#lowcol_slider").slider("value", $(this).val());
});
 });
 
 $(function() {
 
    $( "#highcol_slider" ).slider({
       orientation:"horizontal",
       value:0,
       range: [-50, 50],
       min: -50,
       max: 50,
       slide: function( event, ui ) {
          $( "#high_col" ).val( ui.value );
          $("#form").valid();
       }
    });
    $( "#high_col" ).val( $( "#highcol_slider" ).slider( "value" ) );
    $( "#high_col" ).change(function(){
        $("#highcol_slider").slider("value", $(this).val());
});
 });
 
 $(function() {
    $( "#lowrow_slider" ).slider({
       orientation:"horizontal",
       value:0,
       range: [-50, 50],
       min: -50,
       max: 50,
       slide: function( event, ui ) {
          $( "#low_row" ).val( ui.value );
          $("#form").valid();
       }
    });
    $( "#low_row" ).val( $( "#lowrow_slider" ).slider( "value" ) );
    $( "#low_row" ).change(function(){
        $("#lowrow_slider").slider("value", $(this).val());
});
 });
 
 $(function() {
    $( "#highrow_slider" ).slider({
       orientation:"horizontal",
       value:0,
       range: [-50, 50],
       min: -50,
       max: 50,
       slide: function( event, ui ) {
          $( "#high_row" ).val( ui.value );
          $("#form").valid();
       }
    });
    $( "#high_row" ).val( $( "#highrow_slider" ).slider( "value" ) );
    $( "#high_row" ).change(function(){
        $("#highrow_slider").slider("value", $(this).val());
});
 });




/////////////////////////////////////////

//validator jquery code
//checks for end values greater than the beginning ones
//checks for characters
//checks for decima;s -----not yt work on it

//////////////////////////////////////////

$(function(){

    $.validator.addMethod("greaterThan", function(value, element, params) {
      return this.optional(element) || parseInt(value) >= parseInt($(params).val());
    }, "The second number must <em> not </em> be less than the first number you inputted. Please enter it in again.");
  
    //creates the rules for each input
    $("#form").validate({
      rules: {
        low_col: {
          required: true,
          number: true,
          range: [-50,50],
        },
        high_col:{
          required: true,
          number: true,
          range: [-50,50],
          greaterThan: "#low_col"
        },
        low_row: {
          required: true,
          number: true,
          range: [-50,50],
        },
        high_row: {
          required: true,
          number: true,
          range: [-50,50],
          greaterThan: "#low_row"
        }
      },
      submitHandler: function(form) {
        create_tab();
        input_and_table();
      }
    });
  });
  
  
  function input_and_table() {
  
//some code from this function was taken from https://stackoverflow.com/questions/14643617/create-table-using-javascript
//function generates the table

    var low_col = parseInt(document.getElementById("low_col").value);
    var high_col = parseInt(document.getElementById("high_col").value);
    var low_row = parseInt(document.getElementById("low_row").value);
    var high_row = parseInt(document.getElementById("high_row").value);
  
    var warning=document.getElementById("warning");
    var warning_message = "";
  
    var temp1, temp2;
    var mult_table = "";
  
    
    for (temp1 = low_row - 1; temp1 <= high_row; temp1++) {
      mult_table = mult_table + "<tr>"; 

      if (temp1 == low_row - 1) {
        mult_table = mult_table + "<td>☺️</td>";
  
        
        for (temp2 = low_col; temp2 <= high_col; temp2++) {
          mult_table = mult_table + "<td>" + temp2 + "</td>";
        }
      }
  
      
      else {
        mult_table = mult_table + "<td>" + temp1 + "</td>";
        
        for (temp2 = low_col; temp2 <= high_col; temp2++) {
          mult_table = mult_table + "<td>" + temp1 * temp2 + "</td>";
        }
      }
  
      mult_table = mult_table + "</tr>";
    }
  
    // sends the table to HTML file to be outputted
    document.getElementById("mult_table").innerHTML = mult_table;
  }





//////////////////////////////////////////////////////////////////////////////////////

// code for the tabs in the homework
//appends tabs in here 
//submit tab acts like a submit button and creates a new tab with the table while tab 1 had the updated table
//use checkboxes to select and delete tabs

////////////////////////////////////////////////////////////////////////

  $( function() {
    $( "#tabs" ).tabs();
  } );
  

  function create_tab(){

    var low_col = parseInt(document.getElementById("low_col").value);
    var high_col = parseInt(document.getElementById("high_col").value);
    var low_row = parseInt(document.getElementById("low_row").value);
    var high_row = parseInt(document.getElementById("high_row").value);
  
    var temp1, temp2;
    var mult_table = "";
  
    var col_length = (high_col-low_col)+1;
    var row_length = (high_row-low_row)+1;

    mult_table += "<table class='table_2'>";
  
    
    for (temp1 = low_row - 1; temp1 <= high_row; temp1++) {
      mult_table = mult_table + "<tr>"; 
  
      
      if (temp1 == low_row - 1) {
        mult_table = mult_table + "<td>☺️</td>";

        for (temp2 = low_col; temp2 <= high_col; temp2++) {
          mult_table = mult_table + "<td>" + temp2 + "</td>";
        }
      }
  
      
      else {
        mult_table = mult_table + "<td>" + temp1 + "</td>";
        
        for (temp2 = low_col; temp2 <= high_col; temp2++) {
          mult_table = mult_table + "<td>" + temp1 * temp2 + "</td>";
        }
      }
  
      mult_table = mult_table + "</tr>";
    }
  
    var index = $("div#tabs ul li").length + 1;
    
    $("div#tabs ul").append(
      "<li><a href='#tab" + index + "'>Tab " + row_length + " x "+ col_length+ "</a><input type='checkbox' class='tabCheckBox'></li>"
    ); 
    // prints the table dimensions in the tab namef
    $("div#tabs").append(
      "<div id='tab" + index + "'>" + mult_table + "</div>"
    );
  
  
    $("div#tabs").tabs("refresh");
  }
  

  //Used the help of https://www.tutorialrepublic.com/faq/how-to-check-a-checkbox-is-checked-or-not-using-jquery.php
 
  function delete_tab(){
    $("#tabs ul li").each(function() {
      if ($(this).find('input').prop("checked")) {
        $(this).remove();
        $("#tabs").tabs("refresh");
      }
    });
  }