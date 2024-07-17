<?php
function get_map_content(){
    echo "
    <div class = 'button-container' id = 'map-top'>       
    <form id='map-generator'>
      <label>Column:<input type='number' class='map-form' name='col' placeholder='8'></label>
      <label>Row:<input type='number' class='map-form' name='row' placeholder='10'></label>
      <label>Hex Scale:<input type='number' class='map-form' name='scale' placeholder='40'></label>
      <button type='button' name ='generate-map' id='generator-button'>Generate Map</button>
    </form>
  </div>
  <div class = 'map-block' id='map-left-section'>
    <div class='map-container' id='svg-container'>
      <div name = 'map-goes-here'></div>
    </div>
    <form id='reset-button' style='display:none'>
      <button type='button' name='reset-button' id='reset-button'>Reset Map</button>
    </form>
  </div>
  <div class = 'map-block' id='map-right-section'>
    <div id='map-tab-container'>
      <div class='tab' id='tab-display'>
        <button class='tab-links' id='all-systems'>All Systems</button>
        <button class='tab-links' id='system-information'>System Information</button>
        <button class='tab-links' id='system-trade'>System Trade Information</button>
      </div>
      <div id='content-container'>
        <div class='tab-content' id='all-systems-content'></div>
        <div class='tab-content' id='system-information-content'></div>
        <div class='tab-content' id='system-trade-content'></div>
      </div>
      <form id='run-button' style='display: none'>            
        <label>Simulation Length (Weeks):<input type='number' class='run-form' name='length' placeholder='5'></label>
        <button type='button' name='run-button' id='run-button'>Run Simulation</button>
      </form>
  </div>
    ";
}

function get_map_script(){
    echo "<script type='module' src='./modules/mapcode.js'></script>";
}

?>

