export interface Question {
  id: string;
  category: 'concept' | 'app' | 'package';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const questions: Question[] = [
  // 第一主軸：防空避難觀念宣導 (category: 'concept')
  {
    id: 'concept-1',
    category: 'concept',
    question: '本次115年南部地區舉行的城鎮韌性演習，其確切的實施時間點為何？',
    options: [
      '(A) 115年8月7日09時30分至10時',
      '(B) 115年8月7日10時至10時30分',
      '(C) 115年8月7日14時至14時30分',
      '(D) 115年8月7日15時至16時'
    ],
    correctAnswer: 1
  },
  {
    id: 'concept-2',
    category: 'concept',
    question: '在演習期間，若演習地區內的機關、部隊、學校、團體、公司、廠（場）站或民眾未配合交通管制或疏散引導，地方政府可依法處以多少金額的罰鍰？',
    options: [
      '(A) 新臺幣1萬元以上5萬元以下',
      '(B) 新臺幣5萬元以上25萬元以下',
      '(C) 新臺幣10萬元以上50萬元以下',
      '(D) 新臺幣3萬元以上15萬元以下'
    ],
    correctAnswer: 3
  },
  {
    id: 'concept-3',
    category: 'concept',
    question: '當演習警報響起時，行駛在道路上的車輛（非演習特殊車輛）應如何配合管制？',
    options: [
      '(A) 靠邊停放，駕駛及乘客依警察或民防人員引導進行疏散避難',
      '(B) 維持正常速度繼續行駛，不可滯留在交叉路口',
      '(C) 立即加速駛離演習管制區域，前往外縣市',
      '(D) 開啟雙黃警示燈並直接停在車道中央，人員留在車內緊閉車窗'
    ],
    correctAnswer: 0
  },
  {
    id: 'concept-4',
    category: 'concept',
    question: '關於演習的防空警備訊號，當聽到「長聲1秒、短聲1秒，連續5次」或是接獲手機「國家級警報」簡訊時，這代表什麼意思？',
    options: [
      '(A) 演習圓滿結束，解除警報並恢復正常通行',
      '(B) 演習發生突發狀況，暫停實施管制',
      '(C) 演習正式開始，立即實施疏散避難與交通管制',
      '(D) 警報器系統測試，民眾無須理會'
    ],
    correctAnswer: 2
  },
  {
    id: 'concept-5',
    category: 'concept',
    question: '根據「隔離外牆」原則，在室內避難時，標準的躲避策略應該是？',
    options: [
      '(A) 躲在視野良好的陽台或窗戶旁，以便隨時觀察屋外敵情',
      '(B) 緊貼外牆蹲下，以利用外牆的鋼筋混凝土結構進行掩護',
      '(C) 立即前往頂樓大平台，以避免建築物坍塌時被埋在底層',
      '(D) 避開門窗，躲在與爆炸源至少有「兩道牆」後方的內部無窗房間或走廊'
    ],
    correctAnswer: 3
  },
  {
    id: 'concept-6',
    category: 'concept',
    question: '若防空警報響起時，你正處於「室內高樓層」且附近無地下室，根據避難原則應如何快速應變？',
    options: [
      '(A) 採取遠離外牆與窗戶的原則，前往建築物內側受到「第二道牆」保護的生存區掩蔽',
      '(B) 立即搭乘電梯直達一樓，衝出建築物前往空曠地區',
      '(C) 躲在廚房的大型冰箱或流理台下方，並開啟抽油煙機',
      '(D) 前往客廳落地窗旁趴下，並用雙手抱頭'
    ],
    correctAnswer: 0
  },
  {
    id: 'concept-7',
    category: 'concept',
    question: '如果防空警報響起時，你正開車在「戶外道路」上，周遭完全沒有任何鋼筋混凝土建築物，此時該如何因應？',
    options: [
      '(A) 保持高速行駛直到看見高架橋，並將車輛停在橋墩下方',
      '(B) 將車輛停靠路邊，隨後儘速下車並尋找最近的建築物、地下基礎設施或掩體避難',
      '(C) 立即調頭逆向行駛，尋找最近的交流道駛離該區域',
      '(D) 直接將車輛駛入稻田或草叢中掩蔽，人員留在車內趴下'
    ],
    correctAnswer: 1
  },

  // 第二主軸：防空避難處所查詢 (category: 'app')
  {
    id: 'app-1',
    category: 'app',
    question: '在演習期間，民眾若想知道住家或辦公室附近哪裡有合法的「防空避難設施」，平時或演習前可以透過什麼管道查詢？',
    options: [
      '(A) 撥打 119 消防報案專線請值班人員口頭代查',
      '(B) 透過一般民間網路論壇搜尋網友推薦的防空洞位置',
      '(C) 下載「警政服務APP」或至警政署、各縣市政府警察局官網的「防空避難專區」進行查詢',
      '(D) 必須親自前往鄰近的派出所臨櫃申請紙本清冊'
    ],
    correctAnswer: 2
  },
  {
    id: 'app-2',
    category: 'app',
    question: '在防空警報發布當下，若收到防空疏散避難的「國家級警報」簡訊，簡訊內所附帶的網址具有何種便利功能？',
    options: [
      '(A) 點擊後能自動定位並導航至距離民眾最近的防空避難處所',
      '(B) 點擊後可直接連線至國防部觀看即時戰況直播',
      '(C) 點擊後可線上預約防空避難所的專屬座位',
      '(D) 點擊後會自動通報警政單位，完成線上報到登記'
    ],
    correctAnswer: 0
  },
  {
    id: 'app-3',
    category: 'app',
    question: '在我們日常生活的街道中，下列哪一個地方最有可能在牆面上看見官方黏貼的黃色「防空避難設備標示牌」？',
    options: [
      '(A) 一般平房的客廳、廚房或臥室牆面',
      '(B) 公園的景觀路燈、涼亭頂部或公共廁所外牆',
      '(C) 百貨公司的美食街櫃檯或頂樓遊樂園入口',
      '(D) 大樓地下室、捷運車站、學校等地下空間或地下停車場入口處'
    ],
    correctAnswer: 3
  },
  {
    id: 'app-4',
    category: 'app',
    question: '透過「警政服務APP」查詢生活圈周遭的防空避難室時，點選特定避難點圖示「無法」直接查明下列哪一項資訊？',
    options: [
      '(A) 該避難處所的詳細地址與建築物名稱',
      '(B) 該避難處所目前內部存放的戰備糧食剩餘數量',
      '(C) 該避難處所預計可容納的限制人數（可容納人數）',
      '(D) 透過地圖連動規畫前往該處所的導航路線'
    ],
    correctAnswer: 1
  },
  {
    id: 'app-5',
    category: 'app',
    question: '為了提升全民國防與防災意識，政府整合了多元的數位管道供民眾查詢防空避難處所。下列哪一個管道「無法」查詢到法定的防空避難處所資訊？',
    options: [
      '(A) 內政部消防署「消防e點通」APP或防災有保庇官網',
      '(B) 內政部警政署「警政服務」APP',
      '(C) 民間商業美食外送平台（如 Foodpanda、Uber Eats）的動態地圖',
      '(D) 臺南市政府警察局官方網站的「防空避難專區」'
    ],
    correctAnswer: 2
  },

  // 第三主軸：緊急避難包宣導 (category: 'package')
  {
    id: 'package-1',
    category: 'package',
    question: '關於「緊急避難包」在平時的擺放位置，下列哪一個作法最正確？',
    options: [
      '(A) 鎖在臥室深處的保險箱或衣櫃最上層，以免被小孩拿去玩',
      '(B) 放在家門口附近或玄關等「隨手可及」的地方，方便拿了就跑',
      '(C) 存放在頂樓加蓋的儲藏室內，與其他露營裝備放在一起',
      '(D) 直接放在車子的後車廂，平時完全不需要帶進屋內'
    ],
    correctAnswer: 1
  },
  {
    id: 'package-2',
    category: 'package',
    question: '為了在緊急停電時可以看清環境、確認方位並向外求救，避難包裡最需要放下列哪一組隨身物品？',
    options: [
      '(A) 打火機、酒精燈、木炭與火柴',
      '(B) 蠟燭、高能量飲料、指南針與放大鏡',
      '(C) 收音機、反光背心、暖暖包與捕蚊燈',
      '(D) 哨子、手電筒、行動電源與備用電池'
    ],
    correctAnswer: 3
  },
  {
    id: 'package-3',
    category: 'package',
    question: '準備緊急避難包的糧食時，應該優先選擇具備什麼特性的食物？',
    options: [
      '(A) 餅乾、巧克力、防災食品等不需加熱、高熱量且能即開即食的「乾糧」',
      '(B) 生鮮肉品、蔬菜等營養價值高但需冷藏的食材',
      '(C) 泡麵、冷凍水餃等必須生火加熱煮沸才能食用的食品',
      '(D) 大包裝的白米與麵粉，以利進行長期抗戰'
    ],
    correctAnswer: 0
  },
  {
    id: 'package-4',
    category: 'package',
    question: '避難包裡面的食物、水和藥品，平時放著之後就可以不管它了嗎？我們應該怎麼做？',
    options: [
      '(A) 只要包包沒髒，平時放著就不需要再去理會它',
      '(B) 每次警報響起前再拆開來檢查即可，平時不宜移動',
      '(C) 定期（例如每 6 個月）檢查一下有沒有過期，並隨時汰換與補充',
      '(D) 每週都必須把裡面的水喝掉並更換新水，以保持絕對新鮮'
    ],
    correctAnswer: 2
  },
  {
    id: 'package-5',
    category: 'package',
    question: '關於緊急避難包裡面的飲用水，下列哪一項準備原則是正確的？',
    options: [
      '(A) 只要包包放得下，可以準備 2 瓶左右方便攜帶的包裝飲用水',
      '(B) 必須準備一整箱家庭號礦泉水，背不動就用推車推',
      '(C) 不需要準備水，因為避難所內一定會有充足的自來水供應',
      '(D) 為了節省空間，改帶未過濾的地下水或運動飲料即可'
    ],
    correctAnswer: 0
  }
];

export const getQuestionsByCategory = (category: 'concept' | 'app' | 'package'): Question[] => {
  return questions.filter(q => q.category === category);
};

export const getCategoryName = (category: 'concept' | 'app' | 'package'): string => {
  const names = {
    concept: '防空避難觀念',
    app: '防空避難處所查詢',
    package: '緊急避難包宣導'
  };
  return names[category];
};

export const getCategoryReward = (category: 'concept' | 'app' | 'package'): string => {
  const rewards = {
    concept: '攻擊環',
    app: '鋼鐵輪盤',
    package: '軸底'
  };
  return rewards[category];
};
