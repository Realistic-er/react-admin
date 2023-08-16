export const option = {
    backgroundColor: '#fff',
    title: {
      top: 20,
      text: '用户注册区域展示',
      subtext: '',
      x: 'center',
      textStyle: {
        color: '#000'
      }
    },
    geo: {
      type: 'map',
      map: name, //'jiangxi'
      roam: true,
      geoIndex: 1,
      zoom: 1.1,  //地图的比例
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#000000'  //字体颜色
          }
        },
        emphasis: {
          textStyle: {
            color: '#000000'  //选中后的字体颜色
          }
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#EEEEEE',
          borderColor: '#8b8b8b',
        },
        emphasis: {
          areaColor: '#ffffff',
        }
      },
    },
};