// http://packery.metafizzy.co/packery.pkgd.js added as external resource
// jQuery & jQuery UI included

$( function() {
  var $container = $('.packery');
  $container.packery({
    columnWidth: 80
  });
  // get item elements, jQuery-ify them
  var $itemElems = $( $container.packery('getItemElements') );
  // make item elements draggable
  $itemElems.draggable().resizable();
  // bind Draggable events to Packery
  $container.packery( 'bindUIDraggableEvents', $itemElems );
  
  // handle resizing
  var resizeTimeout;
  $itemElems.on( 'resize', function( event, ui ) {
    // debounce
    if ( resizeTimeout ) {
      clearTimeout( resizeTimeout );
    }
  
    resizeTimeout = setTimeout( function() {
      $container.packery( 'fit', ui.element[0] );
    }, 100 );
  });
});