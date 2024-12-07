export const airSeriesComparison: ProductComparison = {
  products: [
    {
      id: "air-3s",
      name: "DJI Air 3S"
    },
    {
      id: "air-3",
      name: "DJI Air 3"
    },
    {
      id: "air-2s",
      name: "DJI Air 2S"
    }
  ],
  groups: [
    {
      title: "相机",
      specs: [
        {
          key: "视频分辨率",
          values: [
            "广角相机及中长焦相机\nH.264/H.265\n4K：3840×2160@24/25/30/48/50/60/120*fps\nFHD：1920×1080@24/25/30/48/50/60/120*/240*fps\n竖拍 2.7K：1512×2688@24/25/30/48/50/60fps\n\n<sup>* 帧率数字为记录帧率，播放时默认表现为慢动作视频；慢动作视频及 4K 规格录像仅支持 H.265 编码。</sup>",
            "广角相机及中长焦相机\nH.264/H.265\n4K：3840×2160@24/25/30/48/50/60/120*fps\nFHD：1920×1080@24/25/30/48/50/60/120*/200*fps\n\n<sup>* 帧率数字为记录帧率，播放时默认表现为慢动作视频。</sup>",
            "哈苏相机：\nApple ProRes 422 HQ\nApple ProRes 422\nApple ProRes 422 LT\n4K：3840×2160@24/25/30/48/50/60fps\n\nH.264/H.265\n4K：3840×2160@24/25/30/48/50/60fps\nFHD：1920×1080@24/25/30/50/60fps"
          ]
        },
        {
          key: "视频格式",
          values: [
            "MP4（MPEG-4 AVC/H.264，HEVC/H.265）",
            "MP4（MPEG-4 AVC/H.264，HEVC/H.265）",
            "MP4/MOV（MPEG-4 AVC/H.264，HEVC/H.265）\nMOV（Apple ProRes 422 HQ/422/422 LT）"
          ]
        }
      ]
    },
    {
      title: "图传",
      specs: [
        {
          key: "图传方案",
          values: ["O4", "O4", "O3+"]
        },
        {
          key: "最大信号有效距离",
          values: [
            "FCC：20 公里\nCE：10 公里\nSRRC：10 公里\nMIC：10 公里\n\n<sup>以上数据在室外空旷无干扰环境下测得，是各标准下单程不返航飞行的最远通信距离，实际飞行时请留意 app 的返航提示。</sup>",
            "FCC：20 公里\nCE：10 公里\nSRRC：10 公里\nMIC：10 公里\n\n<sup>以上数据在室外空旷无干扰环境下测得，是各标准下单程不返航飞行的最远通信距离，实际飞行时请留意 app 的返航提示。</sup>",
            "FCC：15 公里\nCE：8 公里\nSRRC：8 公里\nMIC：8 公里\n\n<sup>以上数据在室外空旷无干扰环境下测得，是各标准下单程不返航飞行的最远通信距离，实际飞行时请留意 DJI Fly app 上的返航提示。</sup>"
          ]
        }
      ]
    }
    // Add more groups as needed
  ]
};