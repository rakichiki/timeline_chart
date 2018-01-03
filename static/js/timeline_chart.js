function send_data(category,month,day,group,data_type, method) {

    var xhr = new XMLHttpRequest();
    xhr.open( 'POST', '/timeline_chart', false );
    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    xhr.send( 'category=' + category + '&month=' + month + '&day=' + day + 
              '&group=' + group + '&data_type=' + data_type);
    xhr.abort();

};


function click_table(event) {
  //console.log(event.target.id);
  if (event.target.id == "") {
    return;
  }
  var lock = document.getElementById("lock");
  if (lock.checked == true) {
    return;
  }
  var id_array = event.target.id.split("_");
  var category = id_array[0];
  var month_s  = id_array[1];
  var day_s    = id_array[2];

  var radio01 = document.getElementById("radio01");
  var radio02 = document.getElementById("radio02");
  var radio03 = document.getElementById("radio03");
  var radio04 = document.getElementById("radio04");
  var radio05 = document.getElementById("radio05");
  var radio06 = document.getElementById("radio06");
  var radio07 = document.getElementById("radio07");
  var radio08 = document.getElementById("radio08");

  var class_string = "";
  var group = 0;
  if (radio01.checked == true) {
    class_string = "team_1_select";
    group = 1;
  } else if (radio02.checked == true) {
    class_string = "team_2_select";
    group = 2;
  } else if (radio03.checked == true) {
    class_string = "team_3_select";
    group = 3;
  } else if (radio04.checked == true) {
    class_string = "team_4_select";
    group = 4;
  } else if (radio05.checked == true) {
    class_string = "team_5_select";
    group = 5;
  } else if (radio06.checked == true) {
    class_string = "team_6_select";
    group = 6;
  } else if (radio07.checked == true) {
    class_string = "team_7_select";
    group = 7;
  } else if (radio08.checked == true) {
    class_string = "team_8_select";
    group = 8;
  }

  var change_target = document.getElementById(event.target.id);
  if (change_target.className == "") {
    change_target.className = class_string;
    send_data(category,month_s,day_s,group,"add","post");
  } else {
    if (change_target.className == class_string) {
      change_target.className = "";
      send_data(category,month_s,day_s,group,"del","post");
    }
  }

};



window.onload = function () { 
  //click_table = document.getElementById("table_01").click();
  var click_table_elem = document.getElementById("table_01");
  click_table_elem.addEventListener('click', click_table, false);
  var click_table_elem = document.getElementById("table_02");
  click_table_elem.addEventListener('click', click_table, false);
  var click_table_elem = document.getElementById("table_03");
  click_table_elem.addEventListener('click', click_table, false);
}



