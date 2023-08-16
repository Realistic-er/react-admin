import React, { useEffect, useState, useRef } from 'react';
import Charts1 from '../../components/components/Charts1';
import Charts2 from '../../components/components/Charts2';
import Charts3 from '../../components/components/Charts3';
import DivShow from '../../components/components/DivShow';
import * as echarts from 'echarts';
// import Icon, { AppstoreOutlined } from '@ant-design/icons';
import * as Icon from '@ant-design/icons';
import styles from '../../style/views/charts.module.scss';
import { array, arraytype } from '../../utils/map/datashow';

const Charts: React.FC = () => {
    const ref = useRef(null);
    const Icons: React.FC<any> = Icon as any;
    const china = require("../../utils/map/china.json");
    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        let myChart:any = null;
        echarts.registerMap('china', china);
        myChart = echarts.init(ref.current);
        //地标经纬度
        const geoCoordMap:any = {
          '上海': [121.4648, 31.2891],
          '东莞': [113.8953, 22.901],
          '东营': [118.7073, 37.5513],
          '中山': [113.4229, 22.478],
          '临汾': [111.4783, 36.1615],
          '临沂': [118.3118, 35.2936],
          '丹东': [124.541, 40.4242],
          '丽水': [119.5642, 28.1854],
          '乌鲁木齐': [87.9236, 43.5883],
          '佛山': [112.8955, 23.1097],
          '保定': [115.0488, 39.0948],
          '兰州': [103.5901, 36.3043],
          '包头': [110.3467, 41.4899],
          '北京': [116.4551, 40.2539],
          '北海': [109.314, 21.6211],
          '南京': [118.8062, 31.9208],
          '南宁': [108.479, 23.1152],
          '南昌': [116.0046, 28.6633],
          '南通': [121.1023, 32.1625],
          '厦门': [118.1689, 24.6478],
          '台州': [121.1353, 28.6688],
          '合肥': [117.29, 32.0581],
          '呼和浩特': [111.4124, 40.4901],
          '咸阳': [108.4131, 34.8706],
          '哈尔滨': [127.9688, 45.368],
          '唐山': [118.4766, 39.6826],
          '嘉兴': [120.9155, 30.6354],
          '大同': [113.7854, 39.8035],
          '大连': [122.2229, 39.4409],
          '天津': [117.4219, 39.4189],
          '太原': [112.3352, 37.9413],
          '威海': [121.9482, 37.1393],
          '宁波': [121.5967, 29.6466],
          '宝鸡': [107.1826, 34.3433],
          '宿迁': [118.5535, 33.7775],
          '常州': [119.4543, 31.5582],
          '广州': [113.5107, 23.2196],
          '廊坊': [116.521, 39.0509],
          '延安': [109.1052, 36.4252],
          '张家口': [115.1477, 40.8527],
          '徐州': [117.5208, 34.3268],
          '德州': [116.6858, 37.2107],
          '惠州': [114.6204, 23.1647],
          '成都': [103.9526, 30.7617],
          '扬州': [119.4653, 32.8162],
          '承德': [117.5757, 41.4075],
          '拉萨': [91.1865, 30.1465],
          '无锡': [120.3442, 31.5527],
          '日照': [119.2786, 35.5023],
          '昆明': [102.9199, 25.4663],
          '杭州': [119.5313, 29.8773],
          '枣庄': [117.323, 34.8926],
          '柳州': [109.3799, 24.9774],
          '株洲': [113.5327, 27.0319],
          '武汉': [114.3896, 30.6628],
          '汕头': [117.1692, 23.3405],
          '江门': [112.6318, 22.1484],
          '沈阳': [123.1238, 42.1216],
          '沧州': [116.8286, 38.2104],
          '河源': [114.917, 23.9722],
          '泉州': [118.3228, 25.1147],
          '泰安': [117.0264, 36.0516],
          '泰州': [120.0586, 32.5525],
          '济南': [117.1582, 36.8701],
          '济宁': [116.8286, 35.3375],
          '海口': [110.3893, 19.8516],
          '淄博': [118.0371, 36.6064],
          '淮安': [118.927, 33.4039],
          '深圳': [114.5435, 22.5439],
          '清远': [112.9175, 24.3292],
          '温州': [120.498, 27.8119],
          '渭南': [109.7864, 35.0299],
          '湖州': [119.8608, 30.7782],
          '湘潭': [112.5439, 27.7075],
          '滨州': [117.8174, 37.4963],
          '潍坊': [119.0918, 36.524],
          '烟台': [120.7397, 37.5128],
          '玉溪': [101.9312, 23.8898],
          '珠海': [113.7305, 22.1155],
          '盐城': [120.2234, 33.5577],
          '盘锦': [121.9482, 41.0449],
          '石家庄': [114.4995, 38.1006],
          '福州': [119.4543, 25.9222],
          '秦皇岛': [119.2126, 40.0232],
          '绍兴': [120.564, 29.7565],
          '聊城': [115.9167, 36.4032],
          '肇庆': [112.1265, 23.5822],
          '舟山': [122.2559, 30.2234],
          '苏州': [120.6519, 31.3989],
          '莱芜': [117.6526, 36.2714],
          '菏泽': [115.6201, 35.2057],
          '营口': [122.4316, 40.4297],
          '葫芦岛': [120.1575, 40.578],
          '衡水': [115.8838, 37.7161],
          '衢州': [118.6853, 28.8666],
          '西宁': [101.4038, 36.8207],
          '西安': [109.1162, 34.2004],
          '贵阳': [106.6992, 26.7682],
          '连云港': [119.1248, 34.552],
          '邢台': [114.8071, 37.2821],
          '邯郸': [114.4775, 36.535],
          '郑州': [113.4668, 34.6234],
          '鄂尔多斯': [108.9734, 39.2487],
          '重庆': [107.7539, 30.1904],
          '金华': [120.0037, 29.1028],
          '铜川': [109.0393, 35.1947],
          '银川': [106.3586, 38.1775],
          '镇江': [119.4763, 31.9702],
          '长春': [125.8154, 44.2584],
          '长沙': [113.0823, 28.2568],
          '长治': [112.8625, 36.4746],
          '阳泉': [113.4778, 38.0951],
          '青岛': [120.4651, 36.3373],
          '韶关': [113.7964, 24.7028]
        };
        const XAData = [
          [{
              name: '西安'
          }, {
              name: '北京',
              value: 100
          }],
          [{
              name: '西安'
          }, {
              name: '上海',
              value: 100
          }],
          [{
              name: '西安'
          }, {
              name: '广州',
              value: 100
          }],
          [{
              name: '西安'
          }, {
              name: '西宁',
              value: 100
          }],
          [{
              name: '西安'
          }, {
              name: '银川',
              value: 100
          }],
          [{
              name: '西安'
          }, {
              name: '南昌',
              value: 100
          }]
      ];
      
      const XNData = [
          [{
              name: '西宁'
          }, {
              name: '北京',
              value: 100
          }],
          [{
              name: '西宁'
          }, {
              name: '上海',
              value: 100
          }],
          [{
              name: '西宁'
          }, {
              name: '广州',
              value: 100
          }],
          [{
              name: '西宁'
          }, {
              name: '西安',
              value: 100
          }],
          [{
              name: '西宁'
          }, {
              name: '银川',
              value: 100
          }]
      ];
      
      const YCData = [
          [{
              name: '银川'
          }, {
              name: '北京',
              value: 100
          }],
          [{
              name: '银川'
          }, {
              name: '广州',
              value: 100
          }],
          [{
              name: '银川'
          }, {
              name: '上海',
              value: 100
          }],
          [{
              name: '银川'
          }, {
              name: '西安',
              value: 100
          }],
          [{
              name: '银川'
          }, {
              name: '西宁',
              value: 100
          }],
      ];
      //飞机图片样式
      const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
      //const planePath = 'arrow';
      const convertData = function(data:any) {
          const res = [];
          for (let i = 0; i < data.length; i++) {
      
              const dataItem = data[i];
      
              const fromCoord = geoCoordMap[dataItem[0].name];
              const toCoord = geoCoordMap[dataItem[1].name];
              if (fromCoord && toCoord) {
                  res.push({
                      fromName: dataItem[0].name,
                      toName: dataItem[1].name,
                      coords: [fromCoord, toCoord],
                      value: dataItem[1].value
                  });
              }
          }
          return res;
      
      };
      
      const color = ['#a6c84c', '#ffa022', '#46bee9']; //航线的颜色
      const series:any = [];
      [
          ['西安', XAData],
          ['西宁', XNData],
          ['银川', YCData]
      ].forEach(function(item, i) {
          series.push(
              //第一个series 设置飞机路线的特效
              //第二个series 设置地图点的特效
             {
              //飞机特效设置
              name: item[0] ,
              type: 'lines',
              zlevel: 2,
              //线两端的标记类型，none,arrow等
              symbol: ['none', 'none'],
              symbolSize: 10,
              effect: {
                  show: true,
                  period: 6,
                  trailLength: 0,
                  //选择样式
                  symbol: planePath,
                  //飞机大小
                  symbolSize: 12
              },
              lineStyle: {
                    color: color[i],
                    //飞行路线宽度
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
              },
              data: convertData(item[1])
          }, {
              name: item[0] + ' Top3',
              //带有涟漪特效动画的散点（气泡）图
              type: 'effectScatter',
              //使用地理坐标系
              coordinateSystem: 'geo',
              zlevel: 2,
              //涟漪特效相关配置
              rippleEffect: {
                  //设置为波纹效果
                  brushType: 'stroke'
              },
              label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
              },
              symbolSize: function(val:any) {
                  return val[2] / 8;
              },
              itemStyle: {
                    color: color[i],
                  emphasis: {
                      areaColor: '#2B91B7'
                  }
              },
              data: (item[1] as any).map(function(dataItem:any) {
                  return {
                      name: dataItem[1].name,
                      value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                  };
              })
          });
      });
        const option = {
          // layoutCenter: ['70%', '20%'],//位置
          tooltip: {
            backgroundColor: 'rgba(21, 24, 45, 0.9)', // 提示框浮层的背景颜色。
            textStyle: {
              // 提示框浮层的文本样式。
              color: '#fff',
              fontSize: 14,
            },
            extraCssText: 'border-color: rgba(21, 24, 45, 0.9);',
          },
          // visualMap: {
          //   min: 0,
          //   left: 'left',
          //   top: 'bottom',
          //   inRange: {
          //     color: ['#D2DDFF', '#6E92FF'], //取值范围的颜色
          //   },
          //   show: true, //图注
          // },
          geo: {
            map: 'china',
            roam: false, //不开启缩放和平移
            zoom: 0.8, //视角缩放比例
            center: [105, 46],
            label: {
              // normal: {
              //   show: true,
              //   fontSize: '10',
              //   color: 'blue',
              // },
            },
            itemStyle: {
                areaColor: 'grey',
                borderColor: 'rgba(0, 0, 0, 0.2)',
              emphasis: {
                areaColor: '#4BD6C7', //鼠标选择区域颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
          series: series,
        };
        myChart.setOption(option);
    }, []);
    // const createAntdIcon = (iconName: React.ForwardRefExoticComponent<any>) => {
    //     return React.createElement(Icon[iconName])
    // };
    
    // const Icon = function (icon) {
    //     return React.createElement(Icons[icon]);
    // };

    return (
      <div className={styles.container}>
        <div className={styles.box} ref={ref}>
        </div>
        <div className={styles.charts}>
          <div className={styles.div1}>
            {/*  */}
            <ul>
                {
                    // import * as Icon from '@ant-design/icons';
                    // createAntdIcon(iconName)
                    // {return React.createElement(Icon[iconName]);}
                    // 注意事项:如果 这样引入AntdIcon 后 如果想直接用他原生组件需要
                    // <Icon.IdcardOutlined />
                    array.map((item:any,index) => {
                        return <li key={index}>
                            {/* <Icons component={item.icon as React.ForwardRefExoticComponent<any>} /> */}
                            {/*  */}
                            <img src={item.icon} alt="" />
                            <div>
                                <p>{item.label}</p>
                                <p>{item.data}</p>
                            </div>
                        </li>
                    })
                }
            </ul>
            {/*  */}
            <div className={styles.charts1}>
                <Charts1 />
            </div>
            {/*  */}
            <div className={styles.charts2}>
                <Charts2 />
            </div>
          </div>
          <div className={styles.div2}>
                <DivShow />
          </div>
          {/*  */}
          <div className={styles.div3}>
            <div className={styles.charts2}>
                <Charts2 />
            </div>
            <div className={styles.charts2}>
                <Charts2 />
            </div>
            <div className={styles.charts2}>
                <Charts2 />
            </div>
          </div>
        </div>
      </div>
        
    )
};

export default Charts;