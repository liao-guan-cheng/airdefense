export interface Question {
  id: string;
  category: 'concept' | 'app' | 'package';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const questions: Question[] = [
  // 防空避難觀念 (Concept)
  {
    id: 'concept-1',
    category: 'concept',
    question: '本次115年南部地區舉行的城鎮韌性演習，其確切的實施時間點為何？',
    options: [
      '115年7月7日10時至10時30分',
      '115年8月7日10時至10時30分',
      '115年8月8日10時至10時30分',
      '115年9月7日10時至10時30分'
    ],
    correctAnswer: 1,
    explanation: '115年南部地區城鎮韌性演習確切實施時間為115年8月7日10時至10時30分。'
  },
  {
    id: 'concept-2',
    category: 'concept',
    question: '在演習期間，若演習地區內的機關、部隊、學校、團體、公司、廠（場）站或民眾未配合管制，地方政府可依法處以多少金額的罰鍰？',
    options: [
      '新臺幣1萬元以上5萬元以下',
      '新臺幣3萬元以上15萬元以下',
      '新臺幣5萬元以上20萬元以下',
      '新臺幣10萬元以上30萬元以下'
    ],
    correctAnswer: 1,
    explanation: '根據相關規定，未配合管制可處以新臺幣3萬元以上15萬元以下的罰鍰。'
  },
  {
    id: 'concept-3',
    category: 'concept',
    question: '當115年8月7日10時演習警報響起時，行駛在道路上的車輛（非演習車輛）應如何配合管制？',
    options: [
      '繼續行駛至最近的停車場停放',
      '靠邊停放，駕駛及乘客依警察或民防人員引導疏散避難',
      '加速離開演習地區',
      '停在原地等待警察指示'
    ],
    correctAnswer: 1,
    explanation: '演習警報響起時，車輛應靠邊停放，駕駛及乘客應依警察或民防人員的引導進行疏散避難。'
  },
  {
    id: 'concept-4',
    category: 'concept',
    question: '關於115年8月7日南部演習的防空警備訊號，當聽到「長聲1秒、短聲1秒，連續5次」或是接獲手機「國家級警報」簡訊時，這代表什麼意思？',
    options: [
      '演習即將開始，請做好準備',
      '演習正式開始，立即實施疏散避難與交通管制',
      '演習已結束，恢復正常秩序',
      '演習延期，請等待進一步通知'
    ],
    correctAnswer: 1,
    explanation: '「長聲1秒、短聲1秒，連續5次」的警報信號或國家級警報簡訊代表演習正式開始，應立即實施疏散避難與交通管制。'
  },
  {
    id: 'concept-5',
    category: 'concept',
    question: '請問根據隔離外牆原則，在室內避難時，標準的躲避策略應該是？',
    options: [
      '躲在靠近窗戶的地方以便觀察外面',
      '避開門窗，躲在與爆炸源至少有「兩道牆」後方的內部無窗房間或走廊',
      '躲在陽台上並關上門',
      '躲在靠近出口的地方以便快速逃離'
    ],
    correctAnswer: 1,
    explanation: '防空避難的隔離外牆原則要求躲在與爆炸源至少有「兩道牆」後方的內部無窗房間或走廊，以獲得最大保護。'
  },
  {
    id: 'concept-6',
    category: 'concept',
    question: '若防空警報響起時，你正處於「室內高樓層」且附近無地下室，根據避難原則應如何快速應變？',
    options: [
      '立即跑到樓頂尋求救援',
      '採取遠離外牆與窗戶的原則，前往建築物內側受到「第二道牆」保護的生存區掩蔽',
      '從窗戶跳出尋求逃生',
      '留在原地等待救援'
    ],
    correctAnswer: 1,
    explanation: '在室內高樓層無地下室的情況下，應採取遠離外牆與窗戶的原則，前往建築物內側受到「第二道牆」保護的生存區掩蔽。'
  },
  {
    id: 'concept-7',
    category: 'concept',
    question: '如果防空警報響起時，你正走在「戶外開曠地區」且周遭完全沒有任何鋼筋混凝土建築物，此時該如何因應？',
    options: [
      '趴在地上不動',
      '往最高的地方跑',
      '將車輛停靠路邊，隨後儘速下車並進入最近的建築物內避難',
      '繼續原地等待'
    ],
    correctAnswer: 2,
    explanation: '在戶外開曠地區應將車輛停靠路邊，隨後儘速下車並進入最近的建築物內避難。'
  },

  // 防空避難處所查詢 (App)
  {
    id: 'app-1',
    category: 'app',
    question: '在本次南部演習期間，民眾若想知道住家或辦公室附近哪裡有合法的「防空避難設施」，平時或演習前可以透過什麼管道查詢？',
    options: [
      '撥打1999市民熱線',
      '下載「警政服務APP」或至警政署、臺南市政府警察局官網的「防空避難專區」進行查詢',
      '詢問鄰居或社區管理員',
      '查看社區公告欄'
    ],
    correctAnswer: 1,
    explanation: '民眾可以下載「警政服務APP」或至警政署、臺南市政府警察局官網的「防空避難專區」進行查詢。'
  },
  {
    id: 'app-2',
    category: 'app',
    question: '在防空警報發布當下，若收到國防部發送的「國家級警報」簡訊，簡訊內所附帶的網址具有何種便利功能？',
    options: [
      '提供防空知識教育資訊',
      '點擊後能自動定位並導航至距離民眾最近的避難處所',
      '提供疏散路線建議',
      '連結到政府官方新聞稿'
    ],
    correctAnswer: 1,
    explanation: '國家級警報簡訊內附帶的網址能自動定位並導航至距離民眾最近的避難處所。'
  },
  {
    id: 'app-3',
    category: 'app',
    question: '在我們日常生活的街道中，下列哪一個地方最有可能在牆面上看見官方黏貼的「防空避難標示牌」？',
    options: [
      '便利商店門口',
      '公園遊樂設施',
      '大樓地下室、捷運車站、學校等地下空間或地下停車場入口處',
      '街道路燈旁'
    ],
    correctAnswer: 2,
    explanation: '防空避難標示牌通常黏貼在大樓地下室、捷運車站、學校等地下空間或地下停車場入口處。'
  },
  {
    id: 'app-4',
    category: 'app',
    question: '使用警政服務APP查詢防空避難處所時，首先應該進行什麼操作？',
    options: [
      '直接搜尋地址',
      '開啟定位功能',
      '輸入電話號碼',
      '登錄個人帳號'
    ],
    correctAnswer: 1,
    explanation: '使用警政服務APP查詢時，首先應開啟定位功能，以便APP能找到距離最近的避難處所。'
  },
  {
    id: 'app-5',
    category: 'app',
    question: '警政服務APP的防空避難專區提供的查詢功能，主要是為了達成什麼目的？',
    options: [
      '統計全台避難人口數',
      '讓民眾平時熟悉周邊避難設施位置，緊急時刻能迅速避難',
      '提供避難所的住宿預訂',
      '收集民眾的個人資料'
    ],
    correctAnswer: 1,
    explanation: '警政服務APP防空避難專區的主要目的是讓民眾平時熟悉周邊避難設施位置，緊急時刻能迅速避難。'
  },
  {
    id: 'app-6',
    category: 'app',
    question: '關於防空避難處所的查詢，下列敘述何者正確？',
    options: [
      '只能在警報響起時才能查詢',
      '平時就可以查詢，熟悉位置，但並非代表隨時可進入',
      '查詢後就可以隨時進入使用',
      '只有特定身分的人才能查詢'
    ],
    correctAnswer: 1,
    explanation: '平時可以查詢防空避難處所以熟悉位置，但並非代表隨時可進入，需要在警報發放後才能使用。'
  },
  {
    id: 'app-7',
    category: 'app',
    question: '臺南市政府警察局提供的防空避難查詢服務，涵蓋範圍包括哪些類型的避難設施？',
    options: [
      '只有地下室',
      '只有公共建築',
      '地下室、停車場、地下街、防空洞等多種類型的地下空間',
      '只有學校'
    ],
    correctAnswer: 2,
    explanation: '臺南市政府警察局提供的查詢服務涵蓋地下室、停車場、地下街、防空洞等多種類型的地下空間。'
  },

  // 緊急避難包宣導 (Package)
  {
    id: 'package-1',
    category: 'package',
    question: '關於「緊急避難包」在平時的擺放位置，下列哪一個作法最正確？',
    options: [
      '放在家裡最裡面的房間',
      '放在家門口附近等「隨手可及」的地方，方便拿了就跑',
      '放在車子後車廂',
      '放在辦公室抽屜裡'
    ],
    correctAnswer: 1,
    explanation: '緊急避難包應放在家門口附近等「隨手可及」的地方，方便在緊急時刻拿了就跑。'
  },
  {
    id: 'package-2',
    category: 'package',
    question: '為了在緊急停電時可以看清環境、向外求救，避難包裡最需要放下列哪一組隨身物品？',
    options: [
      '手錶、眼鏡、手機',
      '哨子、手電筒、行動電源與電池',
      '手帕、口罩、手套',
      '鑰匙、錢包、證件'
    ],
    correctAnswer: 1,
    explanation: '為了在停電時看清環境和求救，應放入哨子、手電筒、行動電源與電池等物品。'
  },
  {
    id: 'package-3',
    category: 'package',
    question: '準備緊急避難包的糧食時，應該優先選擇具備什麼特性的食物？',
    options: [
      '新鮮蔬菜和水果',
      '需要加熱的便當和湯品',
      '餅乾、巧克力、防災食品等不需要加熱的「乾糧」',
      '冷凍食品'
    ],
    correctAnswer: 2,
    explanation: '應優先選擇餅乾、巧克力、防災食品等不需要加熱的「乾糧」，以應對停電或無法加熱的情況。'
  },
  {
    id: 'package-4',
    category: 'package',
    question: '避難包裡面的食物、水和藥品，平時放著之後就可以不管它了嗎？我們應該怎麼做？',
    options: [
      '完全不用管，放著就可以',
      '每年檢查一次',
      '定期（例如每6個月）檢查一下有沒有過期，並隨時汰換與補充',
      '只在演習前檢查'
    ],
    correctAnswer: 2,
    explanation: '應定期（例如每6個月）檢查避難包內的物品是否過期，並隨時汰換與補充。'
  },
  {
    id: 'package-5',
    category: 'package',
    question: '關於緊急避難包裡面的飲用水，下列哪一項準備原則是正確的？',
    options: [
      '不需要準備飲用水',
      '只要包包放得下，可以準備2瓶左右的包裝飲用水',
      '準備1瓶就足夠',
      '準備越多越好，盡量裝滿整個包包'
    ],
    correctAnswer: 1,
    explanation: '只要包包放得下，可以準備2瓶左右的包裝飲用水，以應對緊急避難時的基本需求。'
  },
  {
    id: 'package-6',
    category: 'package',
    question: '緊急避難包中除了食物和水之外，還應該準備哪些重要物品？',
    options: [
      '只需要食物和水',
      '急救用品、常備藥、手電筒、電池、哨子等多種物品',
      '只需要手機',
      '只需要現金'
    ],
    correctAnswer: 1,
    explanation: '避難包應包含急救用品、常備藥、手電筒、電池、哨子等多種物品，以應對各種緊急情況。'
  },
  {
    id: 'package-7',
    category: 'package',
    question: '準備緊急避難包的目的是什麼？',
    options: [
      '只是為了應付政府檢查',
      '不只是「有備無患」，而是你與家人在關鍵時刻的生存保障',
      '只是為了存放不用的物品',
      '沒有特別的目的'
    ],
    correctAnswer: 1,
    explanation: '準備緊急避難包不只是「有備無患」，而是你與家人在關鍵時刻的生存保障。'
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
