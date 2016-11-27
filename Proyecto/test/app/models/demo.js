// http://packery.metafizzy.co/packery.pkgd.js added as external resource
// jQuery & jQuery UI included


$( function() {
  var $container = $('.packery');
  $container.packery({
    columnWidth: 10,
    rowHeight: 15
  });

  // bind draggabilly events to item elements
  $container.find('.bloque').each( makeEachDraggable );

  function makeEachDraggable( i, itemElem ) {
    // make element draggable with Draggabilly
    var draggie = new Draggabilly( itemElem );
    // bind Draggabilly events to Packery
    $container.packery( 'bindDraggabillyEvents', draggie );
  }

  // add more items
  $('#add-pdf').click( function() {
    var result = prompt("inserte enlace a documento pdf");
    if (result){
      var items = '<div class="bloque"><div class="contenido"><iframe src= "http://docs.google.com/gview?url='+result+'&embedded=true" style= "width: 400px;height: 400px;max-width: 400px;max-height:4000px;position: relative; padding-bottom: 50px; padding-right:50px" frameborder="0"></iframe></div></div>';
      var $items = $(items);
      // add to packery layout
      $container.append( $items )
      .packery( 'appended', $items )
      .packery();
      // make item elements draggable
      $items.each( makeEachDraggable );}
  });

  $('#add-pic').click( function() {
    var result = prompt("inserte enlace a la imagen");
    if (result){
      var items = ' <div class="bloque"><div class="contenido"><img src="'+result+'" style="height: 350px; width:auto; max-height: 400px; max-width:400px; position:relative; padding-bottom: 50px; padding-right:50px"></div></div>';
      var $items = $(items);
      // add to packery layout
      $container.append( $items )
      .packery( 'appended', $items )
      .packery();
      // make item elements draggable
      $items.each( makeEachDraggable );}
  });
  $('#borrar').click( function(){
      $container.on( 'click', '.bloque', function( event ) {
      // remove clicked element
      $container.packery( 'remove', event.currentTarget )
      // shiftLayout remaining item elements
      .packery('shiftLayout');
      $container.off('click','.bloque');
      });
    });
  $('#guardar').click(function(){
    var result = prompt("Ingrese\n"+
                          "1: asimilador\n"+
                          "2: convergente\n"+
                          "3: divergente\n"+
                          "4: asimilador\n"
                        );
    var alerta = alert("Contenido guardado existosamente");
  });
  });
