//Next gen shower
angular.module('indexPageModule')
  .service('indexPageService',
    ['baseConfig', 'hmsPopup',
      function (baseConfig, hmsPopup) {
        var scaneList = [
          // {
          //   id: "1",
          //   pictureUrl: 'build/img/index/img_home_gohome.png',
          //   title: "回家",
          //   context: "一键开启指定设备",
          //   isOneButton: true,
          //   isTwoButton: false,
          //   jsonContext: "1",
          //   isOff: false,
          //   lastUpdateDate: ""
          // },
          {
            id: "2",
            pictureUrl: 'build/img/index/img_home_morning.png',
            title: "&nbsp;&nbsp;&nbsp;晨起",
            context: "告别匆忙的晨起洗漱",
            isOneButton: true,
            isTwoButton: false,
            jsonContext: "1",
            isOff: false,
            lastUpdateDate: "",
            buttonName:"开启",
            buttonStatus:false
          },
          {
            id: "1",
            pictureUrl: 'build/img/index/img_home_leavehome.png',
            title: "&nbsp;&nbsp;&nbsp;离家",
            context: "一键关闭所有设备",
            isOneButton: true,
            isTwoButton: false,
            jsonContext: "1",
            isOff:  false,
            lastUpdateDate: "",
            buttonName:"开启",
            buttonStatus:false
          },
          {
            id: "4",
            pictureUrl: 'build/img/index/img_home_spa.png',
            title: "&nbsp;&nbsp;&nbsp;泡澡",
            context: "出去SPA不如在家泡澡",
            isOneButton: false,
            isTwoButton: true,
            jsonContext: "1",
            isOff:  false,
            lastUpdateDate: "",
            buttonName:"开启",
            buttonStatus:false
          },
          {
            id: "3",
            pictureUrl: 'build/img/index/muyu@3x.png',
            title: "&nbsp;&nbsp;&nbsp;沐浴",
            context: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享受沐浴",
            isOneButton: false,
            isTwoButton: true,
            jsonContext: "1",
            isOff:  false,
            lastUpdateDate: "",
            buttonName:"开启",
            buttonStatus:false
          },
          {
            id: "5",
            pictureUrl: 'build/img/index/img_home_veil.png',
            title: "维亚灯光",
            context: "&nbsp;&nbsp;&nbsp;&nbsp;开始您美好的一天",
            isOneButton: false,
            isTwoButton: false,
            jsonContext: "1",
            isOff:  false,
            lastUpdateDate: "",
            buttonName:"开启",
            buttonStatus:false
          },
          {
            id: "6",
            pictureUrl: 'build/img/index/img_home_period.png',
            title: "大姨了吗",
            context: "女性特殊期洗浴关怀方案",
            isOneButton: false,
            isTwoButton: false,
            jsonContext: "1",
            isOff:  false,
            lastUpdateDate: "",
            buttonName:"开启",
            buttonStatus:false
          }
        ];
        //根据下标直接修改
        this.edit = function (index,item) {
          scaneList[index] = item;
        }
        this.getScaneList = function () {
          return scaneList;
        }
        this.setScaneList = function (value) {
          scaneList = value;
        }

        // 根据ID匹配进行修改。
        this.edits = function (item) {
          for(var i=0;i<scaneList.length;i++){
            if(scaneList[i].id==item.id){
              scaneList[i] = item;
            }
          }
        }

        this.addScane = function (item) {
          scaneList.push(item);
        }
        this.crrentScane = function (item) {
          scaneList.splice(item,1);
          scaneList.unshift(item);
        }




      }]);
