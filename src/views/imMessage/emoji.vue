<template>
  <div id="emojiTag" class="m-emojiTag">
	<div class="m-emoji-wrapper" style="width: 500px; height: auto; display: block;">
		<div  id="emojiBox" class="m-emoji-picCol" style="width: 500px; height: 300px;">
			<ul v-show="emojiTag=='emoji'" class="m-emoji-picCol-ul" style="width: 490px; height: auto;">
				<span id="pic-emoji-[大笑]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_0.png" /></span>
				<span id="pic-emoji-[可爱]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_01.png" /></span>
				<span id="pic-emoji-[色]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_02.png" /></span>
				<span id="pic-emoji-[嘘]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_03.png" /></span>
				<span id="pic-emoji-[亲]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_04.png" /></span>
				<span id="pic-emoji-[呆]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_05.png" /></span>
				<span id="pic-emoji-[口水]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_06.png" /></span>
				<span id="pic-emoji-[汗]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_145.png" /></span>
				<span id="pic-emoji-[呲牙]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_07.png" /></span>
				<span id="pic-emoji-[鬼脸]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_08.png" /></span>
				<span id="pic-emoji-[害羞]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_09.png" /></span>
				<span id="pic-emoji-[偷笑]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_10.png" /></span>
				<span id="pic-emoji-[调皮]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_11.png" /></span>
				<span id="pic-emoji-[可怜]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_12.png" /></span>
				<span id="pic-emoji-[敲]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_13.png" /></span>
				<span id="pic-emoji-[惊讶]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_14.png" /></span>
				<span id="pic-emoji-[流感]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_15.png" /></span>
				<span id="pic-emoji-[委屈]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_16.png" /></span>
				<span id="pic-emoji-[流泪]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_17.png" /></span>
				<span id="pic-emoji-[嚎哭]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_18.png" /></span>
				<span id="pic-emoji-[惊恐]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_19.png" /></span>
				<span id="pic-emoji-[怒]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_20.png" /></span>
				<span id="pic-emoji-[酷]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_21.png" /></span>
				<span id="pic-emoji-[不说]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_22.png" /></span>
				<span id="pic-emoji-[鄙视]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_23.png" /></span>
				<span id="pic-emoji-[阿弥陀佛]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_24.png" /></span>
				<span id="pic-emoji-[奸笑]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_25.png" /></span>
				<span id="pic-emoji-[睡着]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_26.png" /></span>
				<span id="pic-emoji-[口罩]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_27.png" /></span>
				<span id="pic-emoji-[努力]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_28.png" /></span>
				<span id="pic-emoji-[抠鼻孔]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_29.png" /></span>
				<span id="pic-emoji-[疑问]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_30.png" /></span>
				<span id="pic-emoji-[怒骂]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_31.png" /></span>
				<span id="pic-emoji-[晕]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_32.png" /></span>
				<span id="pic-emoji-[呕吐]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_33.png" /></span>
				<span id="pic-emoji-[拜一拜]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_160.png" /></span>
				<span id="pic-emoji-[惊喜]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_161.png" /></span>
				<span id="pic-emoji-[流汗]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_162.png" /></span>
				<span id="pic-emoji-[卖萌]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_163.png" /></span>
				<span id="pic-emoji-[默契眨眼]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_164.png" /></span>
				<span id="pic-emoji-[烧香拜佛]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_165.png" /></span>
				<span id="pic-emoji-[晚安]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_166.png" /></span>
				<span id="pic-emoji-[强]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_34.png" /></span>
				<span id="pic-emoji-[弱]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_35.png" /></span>
				<span id="pic-emoji-[OK]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_36.png" /></span>
				<span id="pic-emoji-[拳头]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_37.png" /></span>
				<span id="pic-emoji-[胜利]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_38.png" /></span>
				<span id="pic-emoji-[鼓掌]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_39.png" /></span>
				<span id="pic-emoji-[握手]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_200.png" /></span>
				<span id="pic-emoji-[发怒]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_40.png" /></span>
				<span id="pic-emoji-[骷髅]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_41.png" /></span>
				<span id="pic-emoji-[便便]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_42.png" /></span>
				<span id="pic-emoji-[火]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_43.png" /></span>
				<span id="pic-emoji-[溜]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_44.png" /></span>
				<span id="pic-emoji-[爱心]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_45.png" /></span>
				<span id="pic-emoji-[心碎]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_46.png" /></span>
				<span id="pic-emoji-[钟情]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_47.png" /></span>
				<span id="pic-emoji-[唇]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_48.png" /></span>
				<span id="pic-emoji-[戒指]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_49.png" /></span>
				<span id="pic-emoji-[钻石]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_50.png" /></span>
				<span id="pic-emoji-[太阳]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_51.png" /></span>
				<span id="pic-emoji-[有时晴]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_52.png" /></span>
				<span id="pic-emoji-[多云]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_53.png" /></span>
				<span id="pic-emoji-[雷]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_54.png" /></span>
				<span id="pic-emoji-[雨]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_55.png" /></span>
				<span id="pic-emoji-[雪花]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_56.png" /></span>
				<span id="pic-emoji-[爱人]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_57.png" /></span>
				<span id="pic-emoji-[帽子]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_58.png" /></span>
				<span id="pic-emoji-[皇冠]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_59.png" /></span>
				<span id="pic-emoji-[篮球]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_60.png" /></span>
				<span id="pic-emoji-[足球]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_61.png" /></span>
				<span id="pic-emoji-[垒球]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_62.png" /></span>
				<span id="pic-emoji-[网球]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_63.png" /></span>
				<span id="pic-emoji-[台球]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_64.png" /></span>
				<span id="pic-emoji-[咖啡]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_65.png" /></span>
				<span id="pic-emoji-[啤酒]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_66.png" /></span>
				<span id="pic-emoji-[干杯]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_67.png" /></span>
				<span id="pic-emoji-[柠檬汁]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_68.png" /></span>
				<span id="pic-emoji-[餐具]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_69.png" /></span>
				<span id="pic-emoji-[汉堡]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_70.png" /></span>
				<span id="pic-emoji-[鸡腿]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_71.png" /></span>
				<span id="pic-emoji-[面条]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_72.png" /></span>
				<span id="pic-emoji-[冰淇淋]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_73.png" /></span>
				<span id="pic-emoji-[沙冰]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_74.png" /></span>
				<span id="pic-emoji-[生日蛋糕]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_75.png" /></span>
				<span id="pic-emoji-[蛋糕]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_76.png" /></span>
				<span id="pic-emoji-[糖果]" style="width: 19px; height: auto;" ><img src="../../images/emoji/emoji_77.png" /></span>
				<span id="pic-emoji-[葡萄]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_78.png" /></span>
				<span id="pic-emoji-[西瓜]" style="width: 19px; height: auto;" ><img src="../../images/emoji/emoji_79.png" /></span>
				<span id="pic-emoji-[光碟]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_80.png" /></span>
				<span id="pic-emoji-[手机]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_81.png" /></span>
				<span id="pic-emoji-[电话]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_82.png" /></span>
				<span id="pic-emoji-[电视]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_83.png" /></span>
				<span id="pic-emoji-[声音开启]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_84.png" /></span>
				<span id="pic-emoji-[声音关闭]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_85.png" /></span>
				<span id="pic-emoji-[铃铛]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_86.png" /></span>
				<span id="pic-emoji-[锁头]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_87.png" /></span>
				<span id="pic-emoji-[放大镜]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_88.png" /></span>
				<span id="pic-emoji-[灯泡]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_89.png" /></span>
				<span id="pic-emoji-[锤头]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_90.png" /></span>
				<span id="pic-emoji-[烟]" style="width: 19px; height: auto;" ><img src="../../images/emoji/emoji_91.png" /></span>
				<span id="pic-emoji-[炸弹]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_92.png" /></span>
				<span id="pic-emoji-[枪]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_93.png" /></span>
				<span id="pic-emoji-[刀]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_94.png" /></span>
				<span id="pic-emoji-[药]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_95.png" /></span>
				<span id="pic-emoji-[打针]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_96.png" /></span>
				<span id="pic-emoji-[钱袋]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_97.png" /></span>
				<span id="pic-emoji-[钞票]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_98.png" /></span>
				<span id="pic-emoji-[银行卡]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_99.png" /></span>
				<span id="pic-emoji-[手柄]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_100.png" /></span>
				<span id="pic-emoji-[麻将]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_101.png" /></span>
				<span id="pic-emoji-[调色板]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_102.png" /></span>
				<span id="pic-emoji-[电影]" style="width: 19px; height: auto;" ><img src="../../images/emoji/emoji_103.png" /></span>
				<span id="pic-emoji-[麦克风]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_104.png" /></span>
				<span id="pic-emoji-[耳机]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_105.png" /></span>
				<span id="pic-emoji-[音乐]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_106.png" /></span>
				<span id="pic-emoji-[吉他]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_107.png" /></span>
				<span id="pic-emoji-[火箭]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_108.png" /></span>
				<span id="pic-emoji-[飞机]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_109.png" /></span>
				<span id="pic-emoji-[火车]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_110.png" /></span>
				<span id="pic-emoji-[公交]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_111.png" /></span>
				<span id="pic-emoji-[轿车]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_112.png" /></span>
				<span id="pic-emoji-[出租车]" style="width: 19px; height: auto;" ><img src="../../images/emoji/emoji_113.png" /></span>
				<span id="pic-emoji-[警车]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_114.png" /></span>
				<span id="pic-emoji-[自行车]" style="width: 19px; height: auto;"><img src="../../images/emoji/emoji_115.png" /></span>
			</ul>
			<ul v-show="emojiTag=='ajmd'" class="m-emoji-picCol-ul" style="width: 490px; height: auto;">
				<span id="pic-pinup-0"  style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd001.png" /></span>
				<span id="pic-pinup-1"  style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd002.png" /></span>
				<span id="pic-pinup-2"  style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd003.png" /></span>
				<span id="pic-pinup-3"  style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd004.png" /></span>
				<span id="pic-pinup-4"  style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd005.png" /></span>
				<span id="pic-pinup-5"  style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd006.png" /></span>
				<span id="pic-pinup-6"  style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd007.png" /></span>
				<span id="pic-pinup-7"  style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd008.png" /></span>
				<span id="pic-pinup-8"  style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd009.png" /></span>
				<span id="pic-pinup-9"  style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd010.png" /></span>
				<span id="pic-pinup-10" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd011.png" /></span>
				<span id="pic-pinup-11" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd012.png" /></span>
				<span id="pic-pinup-12" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd013.png" /></span>
				<span id="pic-pinup-13" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd014.png" /></span>
				<span id="pic-pinup-14" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd015.png" /></span>
				<span id="pic-pinup-15" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd016.png" /></span>
				<span id="pic-pinup-16" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd017.png" /></span>
				<span id="pic-pinup-17" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd018.png" /></span>
				<span id="pic-pinup-18" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd019.png" /></span>
				<span id="pic-pinup-19" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd020.png" /></span>
				<span id="pic-pinup-20" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd021.png" /></span>
				<span id="pic-pinup-21" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd022.png" /></span>
				<span id="pic-pinup-22" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd023.png" /></span>
				<span id="pic-pinup-23" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd024.png" /></span>
				<span id="pic-pinup-24" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd025.png" /></span>
				<span id="pic-pinup-25" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd026.png" /></span>
				<span id="pic-pinup-26" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd027.png" /></span>
				<span id="pic-pinup-27" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd028.png" /></span>
				<span id="pic-pinup-28" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd029.png" /></span>
				<span id="pic-pinup-29" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd030.png" /></span>
				<span id="pic-pinup-30" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd031.png" /></span>
				<span id="pic-pinup-31" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd032.png" /></span>
				<span id="pic-pinup-32" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd033.png" /></span>
				<span id="pic-pinup-33" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd034.png" /></span>
				<span id="pic-pinup-34" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd035.png" /></span>
				<span id="pic-pinup-35" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd036.png" /></span>
				<span id="pic-pinup-36" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd037.png" /></span>
				<span id="pic-pinup-37" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd038.png" /></span>
				<span id="pic-pinup-38" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd039.png" /></span>
				<span id="pic-pinup-39" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd040.png" /></span>
				<span id="pic-pinup-40" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd041.png" /></span>
				<span id="pic-pinup-41" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd042.png" /></span>
				<span id="pic-pinup-42" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd043.png" /></span>
				<span id="pic-pinup-43" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd044.png" /></span>
				<span id="pic-pinup-44" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd045.png" /></span>
				<span id="pic-pinup-45" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd046.png" /></span>
				<span id="pic-pinup-46" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd047.png" /></span>
				<span id="pic-pinup-47" style="width: 75px; height: auto;"><img src="../../images/ajmd/ajmd048.png" /></span>
			</ul>
			<ul v-show="emojiTag=='xxy'" class="m-emoji-picCol-ul" style="width: 490px; height: auto;">
				<span id="pic-pinup-0"  style="width: 75px; height: auto;"><img src="../../images/xxy/xxy001.png" /></span>
				<span id="pic-pinup-1"  style="width: 75px; height: auto;"><img src="../../images/xxy/xxy002.png" /></span>
				<span id="pic-pinup-2"  style="width: 75px; height: auto;"><img src="../../images/xxy/xxy003.png" /></span>
				<span id="pic-pinup-3"  style="width: 75px; height: auto;"><img src="../../images/xxy/xxy004.png" /></span>
				<span id="pic-pinup-4"  style="width: 75px; height: auto;"><img src="../../images/xxy/xxy005.png" /></span>
				<span id="pic-pinup-5"  style="width: 75px; height: auto;"><img src="../../images/xxy/xxy006.png" /></span>
				<span id="pic-pinup-6"  style="width: 75px; height: auto;"><img src="../../images/xxy/xxy007.png" /></span>
				<span id="pic-pinup-7"  style="width: 75px; height: auto;"><img src="../../images/xxy/xxy008.png" /></span>
				<span id="pic-pinup-8"  style="width: 75px; height: auto;"><img src="../../images/xxy/xxy009.png" /></span>
				<span id="pic-pinup-9"  style="width: 75px; height: auto;"><img src="../../images/xxy/xxy010.png" /></span>
				<span id="pic-pinup-10" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy011.png" /></span>
				<span id="pic-pinup-11" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy012.png" /></span>
				<span id="pic-pinup-12" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy013.png" /></span>
				<span id="pic-pinup-13" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy014.png" /></span>
				<span id="pic-pinup-14" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy015.png" /></span>
				<span id="pic-pinup-15" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy016.png" /></span>
				<span id="pic-pinup-16" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy017.png" /></span>
				<span id="pic-pinup-17" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy018.png" /></span>
				<span id="pic-pinup-18" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy019.png" /></span>
				<span id="pic-pinup-19" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy020.png" /></span>
				<span id="pic-pinup-20" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy021.png" /></span>
				<span id="pic-pinup-21" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy022.png" /></span>
				<span id="pic-pinup-22" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy023.png" /></span>
				<span id="pic-pinup-23" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy024.png" /></span>
				<span id="pic-pinup-24" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy025.png" /></span>
				<span id="pic-pinup-25" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy026.png" /></span>
				<span id="pic-pinup-26" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy027.png" /></span>
				<span id="pic-pinup-27" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy028.png" /></span>
				<span id="pic-pinup-28" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy029.png" /></span>
				<span id="pic-pinup-29" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy030.png" /></span>
				<span id="pic-pinup-30" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy031.png" /></span>
				<span id="pic-pinup-31" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy032.png" /></span>
				<span id="pic-pinup-32" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy033.png" /></span>
				<span id="pic-pinup-33" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy034.png" /></span>
				<span id="pic-pinup-34" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy035.png" /></span>
				<span id="pic-pinup-35" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy036.png" /></span>
				<span id="pic-pinup-36" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy037.png" /></span>
				<span id="pic-pinup-37" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy038.png" /></span>
				<span id="pic-pinup-38" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy039.png" /></span>
				<span id="pic-pinup-39" style="width: 75px; height: auto;"><img src="../../images/xxy/xxy040.png" /></span>
			</ul>
			<ul v-show="emojiTag=='lt'" class="m-emoji-picCol-ul" style="width: 490px; height: auto;">
				<span id="pic-pinup-0"  style="width: 75px; height: auto;"><img src="../../images/lt/lt001.png" /></span>
				<span id="pic-pinup-1"  style="width: 75px; height: auto;"><img src="../../images/lt/lt002.png" /></span>
				<span id="pic-pinup-2"  style="width: 75px; height: auto;"><img src="../../images/lt/lt003.png" /></span>
				<span id="pic-pinup-3"  style="width: 75px; height: auto;"><img src="../../images/lt/lt004.png" /></span>
				<span id="pic-pinup-4"  style="width: 75px; height: auto;"><img src="../../images/lt/lt005.png" /></span>
				<span id="pic-pinup-5"  style="width: 75px; height: auto;"><img src="../../images/lt/lt006.png" /></span>
				<span id="pic-pinup-6"  style="width: 75px; height: auto;"><img src="../../images/lt/lt007.png" /></span>
				<span id="pic-pinup-7"  style="width: 75px; height: auto;"><img src="../../images/lt/lt008.png" /></span>
				<span id="pic-pinup-8"  style="width: 75px; height: auto;"><img src="../../images/lt/lt009.png" /></span>
				<span id="pic-pinup-9"  style="width: 75px; height: auto;"><img src="../../images/lt/lt010.png" /></span>
				<span id="pic-pinup-10" style="width: 75px; height: auto;"><img src="../../images/lt/lt011.png" /></span>
				<span id="pic-pinup-11" style="width: 75px; height: auto;"><img src="../../images/lt/lt012.png" /></span>
				<span id="pic-pinup-12" style="width: 75px; height: auto;"><img src="../../images/lt/lt013.png" /></span>
				<span id="pic-pinup-13" style="width: 75px; height: auto;"><img src="../../images/lt/lt014.png" /></span>
				<span id="pic-pinup-14" style="width: 75px; height: auto;"><img src="../../images/lt/lt015.png" /></span>
				<span id="pic-pinup-15" style="width: 75px; height: auto;"><img src="../../images/lt/lt016.png" /></span>
				<span id="pic-pinup-16" style="width: 75px; height: auto;"><img src="../../images/lt/lt017.png" /></span>
				<span id="pic-pinup-17" style="width: 75px; height: auto;"><img src="../../images/lt/lt018.png" /></span>
				<span id="pic-pinup-18" style="width: 75px; height: auto;"><img src="../../images/lt/lt019.png" /></span>
				<span id="pic-pinup-19" style="width: 75px; height: auto;"><img src="../../images/lt/lt020.png" /></span>
			</ul>
		</div>
		<div class="m-emoji-chnCol" style="width: 500px; height: auto;">
			<div class="m-emoji-chnCol-ul" style="width: auto; height: 50px;">
				<span id="chn-emoji-emoji" @click="emojiTag = 'emoji'" :class="emojiTag=='emoji' ? 'f-sel' : '' "><img src="../../images/emoji/emoji_0.png" /></span>
				<span id="chn-pinup-ajmd" @click="emojiTag = 'ajmd'" :class="emojiTag=='ajmd' ? 'f-sel' : '' "><img src="../../images/ajmd/ajmd001.png" /></span>
				<span id="chn-pinup-xxy" @click="emojiTag = 'xxy'" :class="emojiTag=='xxy' ? 'f-sel' : '' "><img src="../../images/xxy/xxy001.png" /></span>
				<span id="chn-pinup-lt" @click="emojiTag = 'lt'" :class="emojiTag=='lt' ? 'f-sel' : '' "><img src="../../images/lt/lt001.png" /></span>
			</div>
		</div>
	</div>
  </div>
</template>
<script>
      export default {
			data(){
				return{
					emojiTag:'emoji', // 三个表情栏切换
					emojiStr:'', // emoji时使用
					emojiObj:{  // 非emoji时使用
						type:'',
						category:'',
						emoji:''
					}


				}
			},
			watch:{
				'emojiTag':function(now,old){
					console.log('now:' + JSON.stringify(now))
				}
			},
			methods:{
				getEmojiId(){

					let emojiBox = document.querySelector('#emojiBox'),
					_this = this


					emojiBox.addEventListener('click',function(e){
						console.log(e.target.nodeName)
						if (e.target && e.target.nodeName === 'IMG' ) {
							let item = e.target;
							_this.emojiStr = item.parentNode.id.split('-')[2]
							_this.setEmojiInfo(_this.emojiStr)
						}
					})
				},
				setEmojiInfo(emojiStr){
					if(this.emojiTag != 'emoji'){
						this.emojiObj.type = 'pinup'
						this.emojiObj.category = this.emojiTag
						this.emojiObj.emoji = this.emojiStr
						console.log(JSON.stringify(this.emojiObj))
						// result:{"type":"pinup","category":"xxy","emoji":"3"}
						this.$dispatch('sendEmojiObj',this.emojiObj)
					}else{
						this.$dispatch('sendEmojiStr',emojiStr)
					}
				}
			},
			ready(){
				this.getEmojiId()
			}
      }
</script>
<style scope>
    @import '../../css/fundmanagement/imChat.css'
</style>
