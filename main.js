import './style.css';




import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import TileLayer from 'ol/layer/Tile';


import 'ol/ol.css'; 
import Map from 'ol/Map'; 
import View from 'ol/View'; 
import OSM from 'ol/source/OSM';


import TileWMS from 'ol/source/TileWMS'; 

const map = new Map({
  target: 'map',
  layers: [],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});



const labelLayer = new VectorLayer({
  source: new VectorSource({
    url: 'http://localhost:8080/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=openlayer:ssa_data_2022_flt&outputFormat=application/json',
    format: new GeoJSON()
  }),
  style: function(feature) {
    return new Style({
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: '#000'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        }),
        text: feature.get('school') // Adjust this to the attribute you want to display
      })
    });
  }
});

map.addLayer(labelLayer);
const wmsLayer = new TileLayer({
  source: new TileWMS({
    url: 'http://localhost:8080/geoserver/wms',
    params: {
      'LAYERS': 'openlayer:ssa_data_2022_flt',
      'TILED': true
    },
    serverType: 'geoserver'
  })
});
map.addLayer(wmsLayer);



