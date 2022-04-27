import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

// @ts-ignore
import FileSaver from 'file-saver';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';

import { MapService, TileSuperMapRest } from '@supermap/iclient-ol';

import * as olControl from 'ol/control';
import * as olExtent from 'ol/extent';
import * as olGeom from 'ol/geom';
import * as olLayer from 'ol/layer';
import * as olSource from 'ol/source';
import * as olStyle from 'ol/style';

@Directive({
  selector: '[appMapPanel]',
})
export class MapPanelDirective {
  private baseUrl = 'http://60.30.27.7:32636/portalproxy/iserver/services/LightGray/rest/maps/TJVMap_LightGray?key=ptY86qJMc42vHpcSWiCJzCYN';
  private imageUrl_b = 'http://10.163.204.4:30664/iserver/services/TJ_I_2020_HISTORY_2020_Q3/rest/maps/TJ_I_2020_HISTORY_2020_Q3';
  // private imageUrl = 'http://10.163.204.4:30664/iserver/services/JiaotanDOM/rest/maps/JTDOM';
  private imageUrl = 'http://10.163.204.4:30664/iserver/services/JTGJDOM4490V20211215/rest/maps/GJ1215_4490';

  private map = null;
  private baseLayers = {
    normal: [],
    earth: [],
  };
  private defLayer = null;
  private features: any[] = null;
  private overlayLayer = null;
  private trackLayer = null;
  private tempOverlay = [];
  private _record = [];
  private _trucks = [];
  private _tracks = [];
  private _stackId: any = null;

  @Input('record')
  set record(v: any[]) {
    this._record = v;
    this.renderGraph();
    this.findFeature();
  }

  @Input('trucks')
  set loaders(v: any[]) {
    this._trucks = v;
    this.renderTrucks();
  }

  @Input('focusPoint')
  set focusPoint(v: []) {
    if (v) {
      this.map.getView().animate({
        duration: 850,
        center: v,
      });
    }
  }

  @Input('tracks')
  set tracks(v: []) {
    this._tracks = v;
    this.renderTrack();
  }

  @Input('baseMapType')
  baseMapType = 'normal'; // normal //earth

  @Input('methods')
  set methods(v: any) {
    if (v === 'printMap') {
      this.printMap();
    }
  }

  @Input()
  popupId: any;
  @Input()
  truckType: any;
  @Output()
  clickMap = new EventEmitter();
  @Output()
  clickTruck = new EventEmitter();

  @Output()
  isLoadingChange = new EventEmitter();

  interval = null;

  constructor(private el: ElementRef) {
    this.initMap();
  }

  initMap(): void {
    new MapService(this.baseUrl).getMapInfo((serviceResult) => {
      if (serviceResult.type === 'processFailed') {
        return false;
      }
      const mapInfo = serviceResult.result;
      const resolutions = [];
      mapInfo.visibleScales.forEach((i) => {
        resolutions.push((360 * 0.0254) / (mapInfo.dpi * 2 * Math.PI * mapInfo.prjCoordSys.coordSystem.datum.spheroid.axis) / i);
      });
      const tileInfo = TileSuperMapRest.optionsFromMapJSON(this.baseUrl, mapInfo);
      const view = new View({
        center: [117.76436610382298, 38.96120321910926],
        zoom: 8,
        resolutions,
        multiWorld: true,
        projection: 'EPSG:4326',
      });

      this.map = new Map({
        target: this.el.nativeElement,
        controls: olControl.defaults({
          zoom: false,
          rotate: false,
          attribution: false,
        }),
        view,
      });

      // if (this.baseMapType === 'normal') {
      const baseMap = new olLayer.Tile({
        source: new TileSuperMapRest({
          url: this.baseUrl,
          ...tileInfo,
          crossOrigin: 'anonymous',
        }),
        visible: false,
        projection: 'EPSG:4326',
      });
      this.map.addLayer(baseMap);
      this.baseLayers.normal = [baseMap];
      // }

      // if (this.baseMapType === 'earth') {
      const imageLayer_b = new olLayer.Tile({
        source: new TileSuperMapRest({
          url: this.imageUrl_b,
          format: 'png',
          crossOrigin: 'anonymous',
        }),
        visible: false,
        projection: 'EPSG:4326',
      });
      this.map.addLayer(imageLayer_b);

      const imageLayer = new olLayer.Tile({
        source: new TileSuperMapRest({
          url: this.imageUrl,
          format: 'png',
          crossOrigin: 'anonymous',
        }),
        visible: false,
        projection: 'EPSG:4326',
      });
      this.map.addLayer(imageLayer);
      this.baseLayers.earth = [imageLayer_b, imageLayer];
      // }

      this.baseLayers[this.baseMapType].forEach(i => {
        i.setVisible(true);
      });

      let overlay = null;
      if (this.popupId) {
        const ele = document.getElementById(this.popupId);
        overlay = new Overlay({
          element: ele,
          autoPan: true,
          autoPanAnimation: {
            duration: 250,
          },
        });
        this.map.addOverlay(overlay);

        this.overlayLayer = new olLayer.Vector({
          source: new olSource.Vector(),
          zIndex: 999,
          style: (feature) => {
            return new olStyle.Style({
              stroke: new olStyle.Stroke({
                width: 3,
                color: 'rgba(89,132,241, 1)',
              }),
              fill: new olStyle.Fill({
                color: 'rgba(89,132,241, .3)',
              }),
              text: new olStyle.Text({
                text: feature.values_.shipName + '-' + feature.values_.name,
              }),
            });
          },
        });
        this.map.addLayer(this.overlayLayer);
      }

      this.defLayer = new olLayer.Vector({
        source: new olSource.Vector(),
        style: (feature) => {
          return [new olStyle.Style({
            stroke: new olStyle.Stroke({
              width: 3,
              color: feature.values_.selected ? '#EE7D31' : 'rgb(126, 199, 117)',
            }),
            fill: new olStyle.Fill({
              color: 'rgba(126, 199, 117, 0.3)',
            }),
            text: new olStyle.Text({
              text: feature.values_.shipName + '-' + feature.values_.name,
            }),
          }), new olStyle.Style({
            text: new olStyle.Text({
              text: '(' + feature.values_.billNo + '）',
              offsetY: 12,
              // fill: new olStyle.Fill({
              //   color: '#fff',
              // }),
            }),
          })];
        },
      });
      this.map.addLayer(this.defLayer);

      this.trackLayer = new olLayer.Vector({
        source: new olSource.Vector(),
        style: [
          new olStyle.Style({
            stroke: new olStyle.Stroke({
              width: 10,
              color: 'rgb(126, 199, 117)',
            }),
          }),
          new olStyle.Style({
            stroke: new olStyle.Stroke({
              width: 2,
              color: '#fff',
              lineDash: [10, 20],
            }),
          }),
          new olStyle.Style({
            image: new olStyle.Icon({
              anchor: [0.5, 0.5],
              opacity: 1,
              src: './../../assets/map/icon_start.png',
              scale: 0.3,
            }),
          }),
        ],
      });
      this.map.addLayer(this.trackLayer);

      this.map.once('rendercomplete', () => {
        // 添加点击事件
        this.map.on('singleclick', (e) => {
          if (this.popupId) {
            overlay.setPosition(null);
            this.overlayLayer.setSource(new olSource.Vector());
          }
          this.map.forEachFeatureAtPixel(
            e.pixel,
            (feature) => {
              if (feature) {
                this.clickMap.next(feature.values_);

                if (this.popupId) {
                  overlay.setPosition(e.coordinate);
                  this.overlayLayer.setSource(
                    new olSource.Vector({
                      features: [feature],
                    }),
                  );
                }
              }
            },
            {
              hitTolerance: 10,
              layerFilter: (layer) => {
                return layer === this.defLayer;
              },
            },
          );
        });

        //
        if (this._record) {
          this.renderGraph();
          this.findFeature();
        }
      });
    });
  }

  renderGraph(): void {
    if (!this._record || !this.defLayer) {
      return null;
    }
    this.features = [];

    this._record.forEach((v: any, i) => {
      const pointList = JSON.parse(v.diagramJson);
      this.features.push(
        new Feature({
          geometry: new olGeom.Polygon([[...pointList, pointList[0]]]),
          ...v,
        }),
      );
      if (v.selected) {
        this._stackId = v.id;
      }
    });

    this.defLayer.setSource(
      new olSource.Vector({
        features: this.features,
      }),
    );
  }

  onFocus(extent: any): void {
    this.map.getView().animate({
      duration: 850,
      center: olExtent.getCenter(extent),
    });
  }

  findFeature(): void {
    if (this.features && this._stackId) {
      const selected = this.features.filter((i) => {
        return i.values_.id === this._stackId;
      });

      if (selected.length > 0) {
        this.onFocus(selected[0].values_.geometry.extent_);
      }
    }
  }

  onClickTruck(data: any): void {
    this.clickTruck.emit(data);
  }

  renderTrucks(): void {
    if (!this._trucks || !this.defLayer) {
      return null;
    }

    this.tempOverlay.forEach((v) => {
      this.map.removeOverlay(v);
    });

    const truckDom = document.getElementById('popupTruck');
    const parentDom = document.getElementById('temp__container');
    parentDom.innerHTML = '';
    this._trucks.forEach((v, i) => {
      const truck = truckDom.cloneNode(true) as HTMLElement;
      truck.id = 'truck__' + v.deviceNo;
      if (this.truckType === 'loader') {
        truck.getElementsByClassName('truck-status__text')[0].innerHTML = v.name;
        truck.getElementsByClassName('truck__name__text')[0].innerHTML = v.name;
      } else {
        truck.getElementsByClassName('truck-status__text')[0].innerHTML = v.planNo;
        truck.getElementsByClassName('truck__name__text')[0].innerHTML = v.licenseNumber;
      }
      truck.addEventListener('click', (e) => {
        this.onClickTruck({ ...v, truckType: this.truckType });
      });
      parentDom.appendChild(truck);
      const overlay = new Overlay({
        id: v.deviceNo ? v.deviceNo : i,
        element: truck,
        autoPan: false,
        stopEvent: false,
        positioning: 'center-center',
        position: v.coordinate,
      });
      this.map.addOverlay(overlay);
      this.tempOverlay.push(overlay);
    });
  }

  // 2021-11-29 09:40
  private renderTrack(): void {
    if (!this._tracks || !this.trackLayer || this._tracks.length <= 0) {
      if (this.interval) {
        clearInterval(this.interval);
        this.trackLayer.setSource(new olSource.Vector());
        this.interval = null;
      }
      return null;
    }
    const points = this._tracks.map((i) => i.point);
    this.trackLayer.setSource(
      new olSource.Vector({
        features: [
          new Feature({
            geometry: new olGeom.Point(points[0]),
          }),
          new Feature({
            geometry: new olGeom.LineString(points),
          }),
        ],
      }),
    );

    let index = 0;
    const overlay = this.map.getOverlayById(this._tracks[0].deviceNo);
    // const dom = overlay.getElement();
    this.interval = setInterval(() => {
      overlay.setPosition(points[index]);
      // this.map.getView().animate({
      //   center: points[index],
      // });
      // if (points.length - 2 >= index) {
      //   const d = Math.atan2(points[index + 1][1] - points[index][1], points[index + 1][0] - points[index][0]) * (180 / Math.PI);
      //   console.log(d);
      //   dom.style.transform = 'scale(.3) rotate(' + d + 'deg)';
      // }
      index++;
      if (index === points.length) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }, (10 / points.length) * 1000);
  }

  printMap(): void {
    const dom = document.createElement('dev');
    dom.style.background = 'rgba(0, 0, 0, .4)';
    dom.style.position = 'fixed';
    dom.style.height = '100vh';
    dom.style.width = '100vw';
    dom.style.top = '0';
    dom.style.left = '0';
    dom.style.zIndex = '999';
    dom.style.display = 'flex';
    dom.style.display = 'flex';
    dom.style.justifyContent = 'center';
    dom.style.alignItems = 'center';
    dom.innerHTML = '<h1 style="color: #fff;">正在生成图片...</h1>';
    document.body.appendChild(dom);
    const resolution = 90;
    const dim = [document.body.clientWidth, document.body.clientHeight];
    const width = Math.round((dim[0] * resolution) / 25.4);
    const height = Math.round((dim[1] * resolution) / 25.4);
    const size = this.map.getSize();
    const viewResolution = this.map.getView().getResolution();
    if (this.baseMapType === 'earth') {
      this.baseLayers.normal.forEach(i => {
        i.setVisible(true);
      });
      this.baseLayers.earth.forEach(i => {
        i.setVisible(false);
      });
    }
    // Set print size
    const printSize = [width, height];
    this.map.setSize(printSize);
    const scaling = Math.min(width / size[0], height / size[1]);
    this.map.getView().setResolution(viewResolution / scaling);

    this.map.once('rendercomplete', (data) => {
      const mapCanvas = document.createElement('canvas');
      mapCanvas.width = width;
      mapCanvas.height = height;
      const mapContext = mapCanvas.getContext('2d');
      document.querySelectorAll('.ol-layer canvas').forEach((canvas: HTMLCanvasElement) => {
        if (canvas.width > 0) {
          mapContext.globalAlpha = 1;
          const transform = canvas.style.transform;
          // Get the transform parameters from the style's transform matrix
          const matrix = transform
            .match(/^matrix\(([^\(]*)\)$/)[1]
            .split(',')
            .map(Number);
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(
            mapContext,
            matrix,
          );
          mapContext.drawImage(canvas, 0, 0);
        }
      });

      mapCanvas.toBlob((blob) => {
        FileSaver.saveAs(blob, '地图_' + new Date().getTime() + '.png');
      });

      // Reset original map size
      this.map.setSize(size);
      this.map.getView().setResolution(viewResolution);
      if (this.baseMapType === 'earth') {
        this.baseLayers.normal.forEach(i => {
          i.setVisible(false);
        });
        this.baseLayers[this.baseMapType].forEach(i => {
          i.setVisible(true);
        });
      }

      dom.remove();
      this.isLoadingChange.emit(false);
    });
  }
}
