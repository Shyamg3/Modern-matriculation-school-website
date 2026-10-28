import React, { useEffect, useRef, useState } from 'react';
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View, Image, ImageBackground, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const C = { ink:'#171715', muted:'#6e706e', paper:'#fbf9f5', white:'#fff', orange:'#f36b32', pale:'#faeee7', line:'#ece8e1', green:'#087c72', blue:'#344daf' };
const SCHOOL = 'Modern Matric Higher Secondary School';
const ADDRESS = 'Rajeev Gandhi Nagar, Chavadi, Semmandalam, Cuddalore, Tamil Nadu 607001, India';
const PHONE = '+91 98430 12464';
const MAP = 'https://www.google.com/maps/search/?api=1&query=Modern+Matric+Higher+Secondary+School%2C+Rajeev+Gandhi+Nagar%2C+Cuddalore';
const photos = {
  campus: require('./assets/school-campus.png'), gate: require('./assets/school-gate.png'),
  students: require('./assets/student-activity.png'), community: require('./assets/school-community.png'),
  playground: require('./assets/school-life.png'), classroom: require('./assets/classroom-achievement.png')
};

function Action({ children, onPress, light = false, small = false }) {
  return <Pressable accessibilityRole="button" className={Platform.OS==='web'?'action-button':undefined} onPress={onPress} style={[s.action, light && s.actionLight, small && s.actionSmall]}><Text style={[s.actionText, light && s.actionTextDark]}>{children}</Text></Pressable>;
}
function Label({ children, green = false, inverse = false }) { return <Text style={[s.label, green && s.labelGreen, inverse && s.labelInverse]}>{children}</Text>; }
function Headline({ eyebrow, title, body }) { return <View style={s.headline}><Label>{eyebrow}</Label><Text style={s.h2}>{title}</Text>{body ? <Text style={s.body}>{body}</Text> : null}</View>; }

export default function App() {
  const { width } = useWindowDimensions();
  const mobile = width < 1024;
  const heroImages = [photos.campus, photos.gate, photos.students, photos.community];
  const carouselWidth = mobile ? Math.max(280, width - 52) : Math.max(320, (width * 0.89 - 34) * (1.1 / 2.13) - 15);
  const heroCarouselRef = useRef(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  useEffect(() => {
    if (carouselPaused) return undefined;
    const timer = setTimeout(() => {
      heroCarouselRef.current?.scrollTo({ x:((heroSlide + 1) % heroImages.length) * carouselWidth, animated:true });
    }, 4000);
    return () => clearTimeout(timer);
  }, [carouselPaused, heroSlide, carouselWidth]);
  const [studentCount, setStudentCount] = useState(0);
  useEffect(() => {
    let start = null;
    let frame = null;
    const animate = timestamp => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / 1600, 1);
      setStudentCount(Math.floor(progress * 500));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => frame !== null && cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const id = 'modern-school-motion';
    const style = document.getElementById(id) || document.createElement('style');
    style.id = id;
      style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');html{scroll-behavior:smooth}body{margin:0;overflow-x:hidden;background:${C.paper};font-family:'Segoe UI',Inter,system-ui,sans-serif}*{box-sizing:border-box;font-family:'Segoe UI',Inter,system-ui,sans-serif!important}.school-wordmark{font-family:'Segoe UI',Inter,system-ui,sans-serif!important;font-weight:600!important}.reveal{opacity:0;transform:translateY(18px);transition:opacity .65s ease,transform .65s ease}.reveal.visible{opacity:1;transform:translateY(0)}.hero-photo{animation:hero-enter .9s ease both}.story-photo{transition:transform .5s ease}.story-photo:hover{transform:scale(1.035)}.story-card{transition:transform .25s ease,box-shadow .25s ease}.story-card:hover{transform:translateY(-5px);box-shadow:0 12px 28px rgba(28,35,31,.13)}.nav-item{position:relative;display:inline-block;padding:10px 0;cursor:pointer;transition:color .22s ease,transform .22s ease}.nav-item::after{content:'';position:absolute;left:0;right:0;bottom:3px;height:2px;border-radius:2px;background:${C.orange};transform:scaleX(0);transform-origin:left;transition:transform .28s cubic-bezier(.2,.7,.2,1)}.nav-item:hover{color:${C.orange}!important;transform:translateY(-2px)}.nav-item:hover::after{transform:scaleX(1)}.nav-item:focus-visible{outline:2px solid ${C.orange};outline-offset:4px;border-radius:2px}.action-button{cursor:pointer;transition:transform .2s ease,box-shadow .2s ease,background-color .2s ease}.action-button:hover{background-color:#d95320!important;transform:translateY(-2px);box-shadow:0 7px 18px rgba(40,30,20,.16)}.action-button:active{transform:translateY(0) scale(.98)}.carousel-arrow{cursor:pointer;transition:transform .2s ease,background-color .2s ease}.carousel-arrow:hover{transform:scale(1.08);background-color:${C.orange}}@keyframes hero-enter{from{transform:scale(1.035);opacity:.7}to{transform:scale(1);opacity:1}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}`;
    if (!style.isConnected) document.head.appendChild(style);
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold:.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const call = () => Linking.openURL('tel:+919843012464');
  const whatsapp = () => Linking.openURL('https://wa.me/919843012464');
  const directions = () => Linking.openURL(MAP);
  const jump = id => { if (Platform.OS === 'web' && typeof document !== 'undefined') document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); };
  const links = [['Our school','about'],['Learning','learning'],['School life','life'],['Achievements','achievements'],['Admissions','admissions'],['Contact','visit']];
  const stories = [
    [photos.gate,'OUR SCHOOL','A welcoming place to learn'],
    [photos.students,'STUDENT LIFE','Learning through participation'],
    [photos.community,'OUR COMMUNITY','Growing and celebrating together'],
    [photos.playground,'CAMPUS LIFE','Room to play and discover']
  ];

  return <View style={s.app}><StatusBar style="dark"/><ScrollView contentContainerStyle={s.page} showsVerticalScrollIndicator={false}>
    <View style={[s.nav,mobile&&s.navMobile]}>
      <Pressable onPress={()=>jump('top')} style={s.brand}><View style={s.crest}><Text style={s.crestLetter}>M</Text><View style={s.crestBook}/></View><View><Text className={Platform.OS==='web'?'school-wordmark':undefined} style={s.brandName}>MODERN</Text>{!mobile&&<Text style={s.brandSub}>MATRIC HIGHER SECONDARY SCHOOL</Text>}</View></Pressable>
      {!mobile&&<View style={s.navLinks}>{links.map(([label,id])=><Text key={id} onPress={()=>jump(id)} className={Platform.OS==='web'?'nav-item':undefined} style={s.navText}>{label}</Text>)}</View>}
      <Action small onPress={whatsapp}>Admissions <Text style={s.arrow}>↗</Text></Action>
    </View>

    <View id="top" style={[s.hero,mobile&&s.heroMobile]}>
      <View style={[s.heroCopy,mobile&&s.heroCopyMobile]}>
        <View style={s.heroKicker}><View style={s.kickerDot}/><Label green>LEARN · GROW · SHINE</Label></View>
        <Text style={[s.heroTitle,mobile&&s.heroTitleMobile]}>A brighter future{ '\n' }starts with a{ '\n' }strong foundation.</Text>
        <Text style={s.heroDescription}>A caring school community where students build knowledge, confidence, and a lifelong love of learning.</Text>
        <View style={s.heroActions}><Action onPress={()=>jump('admissions')}>Explore admissions <Text style={s.arrowWhite}>↗</Text></Action><Pressable onPress={()=>jump('about')} style={s.learnLink}><Text style={s.learnLinkText}>Discover our school</Text><Text style={s.linkArrow}>→</Text></Pressable></View>
      </View>
      <View style={[s.heroVisual,mobile&&s.heroVisualMobile]} onTouchStart={()=>setCarouselPaused(true)} onTouchEnd={()=>setCarouselPaused(false)} onTouchCancel={()=>setCarouselPaused(false)} onMouseEnter={()=>setCarouselPaused(true)} onMouseLeave={()=>setCarouselPaused(false)}>
        <ScrollView ref={heroCarouselRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={s.heroCarousel} onMomentumScrollEnd={event=>setHeroSlide(Math.round(event.nativeEvent.contentOffset.x/carouselWidth))}>
          {heroImages.map((photo,index)=><View key={index} style={{width:carouselWidth,height:'100%'}}><ImageBackground source={photo} resizeMode="contain" style={s.heroImage} imageStyle={s.heroImageStyle} className={Platform.OS==='web'?'hero-photo':undefined}>
            <View style={s.imageBadge}><Text style={s.badgeIcon}>✳</Text><Text style={s.badgeText}>A COMMUNITY{ '\n' }THAT HELPS EVERY{ '\n' }STUDENT GROW</Text></View>
            <View style={s.heroPhotoCaption}><Text style={s.photoCapTitle}>{['MODERN MATRIC','OUR SCHOOL GATE','STUDENT LIFE','SCHOOL COMMUNITY'][index]}</Text><Text style={s.photoCapSub}>CUDDALORE · TAMIL NADU</Text></View>
          </ImageBackground></View>)}
        </ScrollView>
        <Pressable accessibilityLabel="Previous campus photo" className={Platform.OS==='web'?'carousel-arrow':undefined} onPress={()=>heroCarouselRef.current?.scrollTo({x:((heroSlide+heroImages.length-1)%heroImages.length)*carouselWidth,animated:true})} style={[s.carouselArrow,s.carouselArrowLeft]}><Text style={s.carouselArrowText}>‹</Text></Pressable>
        <Pressable accessibilityLabel="Next campus photo" className={Platform.OS==='web'?'carousel-arrow':undefined} onPress={()=>heroCarouselRef.current?.scrollTo({x:((heroSlide+1)%heroImages.length)*carouselWidth,animated:true})} style={[s.carouselArrow,s.carouselArrowRight]}><Text style={s.carouselArrowText}>›</Text></Pressable>
        <View style={s.carouselDots}>{heroImages.map((_,i)=><Pressable key={i} accessibilityLabel={'Show campus photo '+(i+1)} onPress={()=>heroCarouselRef.current?.scrollTo({x:i*carouselWidth,animated:true})} style={[s.carouselDot,i===heroSlide&&s.carouselDotActive]}/>)}</View>
        <View style={s.photoMarker}><Text style={s.markerText}>{String(heroSlide+1).padStart(2,'0')}</Text><View style={s.markerLine}/><Text style={s.markerText}>CAMPUS</Text></View>
      </View>
    </View>

    <View className={Platform.OS==='web'?'reveal':undefined} style={[s.studentFeature,mobile&&s.studentFeatureMobile]}>
      <View style={s.studentNumberWrap}><Text style={s.studentNumber}>{studentCount}</Text><Text style={s.studentPlus}>+</Text></View>
      <View style={s.studentText}><Label green>OUR SCHOOL COMMUNITY</Label><Text style={s.studentTitle}>Students learning at Modern</Text><Text style={s.studentCaption}>Growing and shaping a bright future together.</Text></View>
      <View style={s.studentMark}><Text style={s.studentMarkGlyph}>✳</Text></View>
    </View>

    <View style={[s.quickLinks,mobile&&s.quickLinksMobile]}>
      {[["01","Admissions","A simple first step","admissions"],["02","Learning","A strong foundation","learning"],["03","School life","Moments together","life"],["04","Achievements","Student milestones","achievements"],["05","Find us","Visit our campus","visit"]].map(([n,title,sub,id])=><Pressable key={id} onPress={()=>jump(id)} style={s.quickCard}><Text style={s.quickNo}>{n}</Text><View style={s.quickCopy}><Text style={s.quickTitle}>{title}</Text><Text style={s.quickSub}>{sub}</Text></View><Text style={s.quickArrow}>↗</Text></Pressable>)}
    </View>

    <View id="about" className={Platform.OS==='web'?'reveal':undefined} style={[s.intro,mobile&&s.introMobile]}>
      <View style={s.introTitleWrap}><Label>WELCOME TO MODERN</Label><Text style={[s.h2,s.introTitle]}>Where young minds{ '\n' }find their way forward.</Text></View>
      <View style={s.introText}><Text style={s.bodyLarge}>At Modern Matric Higher Secondary School, we believe every student can grow through encouragement, effort, and opportunity.</Text><Text style={s.body}>Our school in Semmandalam, Cuddalore brings learning and community together, helping children build skills and confidence for the road ahead.</Text><Pressable onPress={()=>jump('learning')} style={s.textLink}><Text style={s.textLinkText}>Get to know our school</Text><Text style={s.linkArrow}>↗</Text></Pressable></View>
    </View>

    <View id="learning" className={Platform.OS==='web'?'reveal':undefined} style={[s.learning,mobile&&s.learningMobile]}>
      <View style={s.learningPhotoWrap}><Image source={photos.classroom} resizeMode="contain" style={s.learningImage}/><View style={s.learningStamp}><Text style={s.stampStar}>✳</Text><Text style={s.stampText}>CURIOSITY{ '\n' }IN EVERY{ '\n' }CLASSROOM</Text></View></View>
      <View style={s.learningCopy}><Label green>LEARNING AT MODERN</Label><Text style={s.learningTitle}>Knowledge to build on.{ '\n' }Confidence to carry.</Text><Text style={s.body}>We want learning to inspire questions, steady effort, and pride in every new achievement. Each day is an opportunity to explore and grow.</Text>
        <View style={s.learningRows}>{[['01','Strong learning foundations'],['02','Confidence through participation'],['03','Care, character, and community']].map(([n,t])=><View key={n} style={s.learningRow}><Text style={s.learningNo}>{n}</Text><Text style={s.learningRowText}>{t}</Text><Text style={s.rowArrow}>↗</Text></View>)}</View>
        <Pressable onPress={call}><Text style={s.textLinkText}>Talk with our school <Text style={s.linkArrow}>↗</Text></Text></Pressable>
      </View>
    </View>

    <View id="life" className={Platform.OS==='web'?'reveal':undefined} style={s.stories}>
      <View style={[s.storyHeading,mobile&&s.storyHeadingMobile]}><View><Label>BEYOND THE CLASSROOM</Label><Text style={s.h2}>A school day, full of possibility.</Text></View><Text style={s.storyIntro}>Explore the places, people, and shared experiences that make up life at Modern.</Text></View>
      <View style={[s.storyGrid,mobile&&s.storyGridMobile]}>{stories.map(([image,kicker,title])=><View key={title} className={Platform.OS==='web'?'story-card':undefined} style={[s.storyCard,mobile&&s.storyCardMobile]}><View style={s.storyImageArea}><Image source={image} resizeMode="contain" style={s.storyImage} className={Platform.OS==='web'?'story-photo':undefined}/></View><View style={s.storyText}><Label>{kicker}</Label><Text style={s.storyTitle}>{title}</Text><Text style={s.storyArrow}>↗</Text></View></View>)}</View>
      <Text style={s.photoCredit}>Photographs from the Modern Matric school community.</Text>
    </View>

    <View id="achievements" className={Platform.OS==='web'?'reveal':undefined} style={[s.achievements,mobile&&s.achievementsMobile]}>
      <View style={s.achievementIntro}><Label>STUDENT ACHIEVEMENTS</Label><Text style={s.h2}>Every milestone deserves to be celebrated.</Text><Text style={s.body}>A place to share student awards, school milestones, and proud moments from the Modern community.</Text></View>
      <View style={s.achievementPhotoWrap}><Image source={photos.classroom} resizeMode="contain" style={s.achievementPhoto}/><View style={s.achievementCaption}><Text style={s.achievementCaptionTitle}>Achievement gallery</Text><Text style={s.achievementCaptionSub}>Replace this photo with your latest achievement image in assets/classroom-achievement.png</Text></View></View>
    </View>

    <View id="admissions" className={Platform.OS==='web'?'reveal':undefined} style={[s.admissionBanner,mobile&&s.admissionBannerMobile]}>
      <View style={s.admissionOrnament}/><View style={s.admissionCopy}><Label inverse>ADMISSIONS ENQUIRY</Label><Text style={s.admissionTitle}>Let’s take the next step together.</Text><Text style={s.admissionBody}>Have a question about joining our school? Message our team on WhatsApp.</Text></View><Action light onPress={whatsapp}>Chat on WhatsApp <Text style={s.arrow}>↗</Text></Action>
    </View>

    <View id="visit" className={Platform.OS==='web'?'reveal':undefined} style={[s.visit,mobile&&s.visitMobile]}>
      <View style={s.visitCopy}><Label>VISIT MODERN</Label><Text style={s.visitTitle}>Come see where{ '\n' }learning grows.</Text><Text style={s.body}>We’re in Semmandalam, Cuddalore. Call us if you need help planning your visit.</Text><View style={s.addressRow}><Text style={s.addressIcon}>⌖</Text><Text style={s.address}>{ADDRESS}</Text></View><Pressable onPress={call} style={s.addressRow}><Text style={s.addressIcon}>↗</Text><Text style={s.phone}>{PHONE}</Text></Pressable><View style={{marginTop:23}}><Action onPress={directions}>Get directions <Text style={s.arrowWhite}>↗</Text></Action></View></View>
      <View style={s.map}>{Platform.OS==='web'?React.createElement('iframe',{title:`Map to ${SCHOOL}`,src:'https://maps.google.com/maps?q=Modern%20Matric%20Higher%20Secondary%20School%2C%20Rajeev%20Gandhi%20Nagar%2C%20Cuddalore&t=&z=15&ie=UTF8&iwloc=&output=embed',width:'100%',height:'100%',style:{border:0},loading:'lazy',allowFullScreen:true,referrerPolicy:'no-referrer-when-downgrade'}):<View style={s.mapFallback}><Text style={s.mapIcon}>⌖</Text><Text style={s.mapName}>{SCHOOL}</Text><Text style={s.body}>Semmandalam, Cuddalore</Text><Action onPress={directions}>Open Google Maps ↗</Action></View>}</View>
    </View>
    <View style={[s.footer,mobile&&s.footerMobile]}><View style={s.footerBrand}><View style={s.footerCrest}><Text style={s.crestLetter}>M</Text></View><View><Text style={s.footerName}>MODERN MATRIC HR. SEC. SCHOOL</Text><Text style={s.footerSub}>Rajeev Gandhi Nagar · Cuddalore · Tamil Nadu</Text></View></View><Pressable onPress={call}><Text style={s.footerPhone}>{PHONE} ↗</Text></Pressable><Text style={s.copyright}>© Modern Matric Higher Secondary School</Text></View>
  </ScrollView></View>;
}

const s=StyleSheet.create({
  app:{flex:1,backgroundColor:C.paper},utility:{height:34,paddingHorizontal:'5.5%',backgroundColor:C.white,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:C.line},utilityMobile:{paddingHorizontal:16},utilityName:{fontSize:9,letterSpacing:1.1,fontWeight:'800',color:'#393a38'},utilityRight:{flexDirection:'row',alignItems:'center',gap:14},utilityLink:{fontSize:9,color:'#696a68',letterSpacing:.45},utilityDivider:{color:'#d4d1ca',fontSize:11},nav:{height:76,paddingHorizontal:'5.5%',backgroundColor:C.white,flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:20,borderBottomWidth:1,borderBottomColor:C.line},navMobile:{height:70,paddingHorizontal:16},brand:{flexDirection:'row',alignItems:'center',gap:9},crest:{height:39,width:39,borderRadius:20,borderWidth:1.5,borderColor:'#d2a574',alignItems:'center',justifyContent:'center',backgroundColor:'#fbf7f0'},crestLetter:{fontSize:20,fontWeight:'900',color:C.orange},brandName:{fontSize:15,fontWeight:'900',color:C.ink,letterSpacing:1.5},brandSub:{fontSize:7.3,color:'#737572',letterSpacing:.75,marginTop:3},navLinks:{flexDirection:'row',alignItems:'center',gap:25},navText:{fontSize:11,color:'#484a48',fontWeight:'600'},action:{backgroundColor:C.orange,paddingHorizontal:19,paddingVertical:13,borderRadius:3,alignSelf:'flex-start'},actionSmall:{paddingHorizontal:15,paddingVertical:10},actionLight:{backgroundColor:C.white},actionText:{color:C.white,fontSize:11,fontWeight:'800'},actionTextDark:{color:C.ink},arrow:{color:C.orange,fontWeight:'900'},arrowWhite:{color:'#fff',fontWeight:'900'},hero:{paddingHorizontal:'5.5%',paddingTop:30,paddingBottom:32,flexDirection:'row',alignItems:'stretch',gap:34,backgroundColor:'#f7f3ed',minHeight:490,overflow:'hidden'},heroMobile:{paddingHorizontal:20,paddingTop:33,paddingBottom:28,flexDirection:'column',gap:28},heroCopy:{flex:1.03,justifyContent:'center',paddingVertical:20},heroCopyMobile:{paddingVertical:0},heroKicker:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:15},kickerDot:{height:7,width:7,borderRadius:4,backgroundColor:C.green},label:{fontSize:8.5,color:C.orange,fontWeight:'900',letterSpacing:1.15,marginBottom:10},labelGreen:{color:C.green},heroTitle:{fontSize:48,lineHeight:53,color:C.ink,fontWeight:'800',letterSpacing:-1.8},heroTitleMobile:{fontSize:38,lineHeight:42,letterSpacing:-1.3},heroDescription:{maxWidth:390,fontSize:13,lineHeight:22,color:'#626562',marginTop:15},heroActions:{flexDirection:'row',alignItems:'center',gap:21,flexWrap:'wrap',marginTop:22},learnLink:{flexDirection:'row',alignItems:'center',gap:8},learnLinkText:{fontSize:10,color:C.ink,fontWeight:'700'},linkArrow:{fontSize:16,color:C.orange,fontWeight:'800'},heroVisual:{flex:1.1,minHeight:420,position:'relative',paddingRight:15,paddingBottom:15},heroVisualMobile:{height:340,minHeight:340,flex:0,paddingRight:12,paddingBottom:12},heroImage:{flex:1,minHeight:420,justifyContent:'space-between',backgroundColor:'#ddd'},heroImageStyle:{},imageBadge:{alignSelf:'flex-end',margin:16,width:102,height:102,borderRadius:55,backgroundColor:C.orange,alignItems:'center',justifyContent:'center',transform:[{rotate:'7deg'}]},badgeIcon:{fontSize:18,color:'#fff'},badgeText:{fontSize:7,color:'#fff',lineHeight:10,letterSpacing:.35,textAlign:'center',fontWeight:'800'},heroPhotoCaption:{alignSelf:'flex-start',backgroundColor:'rgba(255,255,255,.94)',paddingVertical:10,paddingHorizontal:13,margin:14},photoCapTitle:{fontSize:9,fontWeight:'900',letterSpacing:.9,color:C.ink},photoCapSub:{fontSize:7,color:'#737572',letterSpacing:.6,marginTop:3},photoMarker:{position:'absolute',right:0,bottom:3,alignItems:'center',gap:4},markerText:{fontSize:7,color:'#696b68',letterSpacing:.8,fontWeight:'800'},markerLine:{width:1,height:24,backgroundColor:C.orange},quickLinks:{marginHorizontal:'5.5%',paddingVertical:20,borderTopWidth:1,borderBottomWidth:1,borderColor:'#dfdad3',flexDirection:'row'},quickLinksMobile:{marginHorizontal:20,flexWrap:'wrap',paddingVertical:0},quickCard:{flex:1,minWidth:130,flexDirection:'row',alignItems:'center',paddingHorizontal:14,paddingVertical:8,gap:9,borderRightWidth:1,borderRightColor:'#e4dfd8'},quickNo:{fontSize:8,color:C.orange,fontWeight:'800',alignSelf:'flex-start',marginTop:3},quickCopy:{flex:1},quickTitle:{fontSize:11,fontWeight:'800',color:C.ink},quickSub:{fontSize:8,color:'#777976',marginTop:3},quickArrow:{color:C.orange,fontSize:13},intro:{paddingHorizontal:'11%',paddingVertical:83,flexDirection:'row',alignItems:'center',gap:80},introMobile:{paddingHorizontal:24,paddingVertical:63,flexDirection:'column',alignItems:'stretch',gap:25},introTitleWrap:{flex:1},introTitle:{fontSize:34,lineHeight:40},h2:{fontSize:31,lineHeight:37,color:C.ink,fontWeight:'800',letterSpacing:-.9},introText:{flex:1,maxWidth:465},bodyLarge:{fontSize:15,lineHeight:25,color:'#393d3b',fontWeight:'600',marginBottom:10},body:{fontSize:12,lineHeight:21,color:'#696d69',marginTop:9},textLink:{flexDirection:'row',alignItems:'center',gap:8,marginTop:12},textLinkText:{fontSize:10,color:C.ink,fontWeight:'800'},learning:{paddingHorizontal:'8%',paddingVertical:58,backgroundColor:'#f0ede7',flexDirection:'row',alignItems:'center',gap:75},learningMobile:{paddingHorizontal:24,paddingVertical:42,flexDirection:'column',gap:32},learningPhotoWrap:{flex:1,width:'100%',height:360,position:'relative',paddingRight:13,paddingBottom:13},learningImage:{width:'100%',height:'100%'},learningStamp:{position:'absolute',right:-1,bottom:0,width:96,height:96,borderRadius:50,backgroundColor:C.green,alignItems:'center',justifyContent:'center',transform:[{rotate:'-8deg'}]},stampStar:{color:'#fff',fontSize:17},stampText:{color:'#fff',fontSize:7,letterSpacing:.5,lineHeight:10,textAlign:'center',fontWeight:'800'},learningCopy:{flex:1,width:'100%'},learningTitle:{fontSize:29,lineHeight:35,color:C.ink,fontWeight:'800',letterSpacing:-.8},learningRows:{borderTopWidth:1,borderTopColor:'#d9d5ce',marginTop:17,marginBottom:21},learningRow:{minHeight:43,flexDirection:'row',alignItems:'center',gap:12,borderBottomWidth:1,borderBottomColor:'#d9d5ce'},learningNo:{fontSize:8,fontWeight:'800',color:C.orange},learningRowText:{flex:1,fontSize:10,color:C.ink,fontWeight:'700'},rowArrow:{fontSize:12,color:'#7f827f'},stories:{paddingHorizontal:'5.5%',paddingTop:78,paddingBottom:64},storyHeading:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',gap:32,marginBottom:24},storyHeadingMobile:{flexDirection:'column',alignItems:'flex-start',gap:8},storyHeadingTitle:{},storyIntro:{maxWidth:310,fontSize:11,lineHeight:19,color:'#717471'},storyGrid:{flexDirection:'row',gap:14},storyGridMobile:{flexDirection:'column'},storyCard:{flex:1,height:260,overflow:'hidden',backgroundColor:'#d9d5ce'},storyCardMobile:{height:230,width:'100%'},storyImage:{flex:1,justifyContent:'flex-end'},storyImageStyle:{},storyShade:{...StyleSheet.absoluteFillObject,backgroundColor:'rgba(18,24,22,.15)'},storyText:{padding:14,backgroundColor:'rgba(255,255,255,.94)',minHeight:70},storyTitle:{fontSize:12,color:C.ink,fontWeight:'800'},storyArrow:{position:'absolute',right:14,bottom:14,color:C.orange,fontSize:15,fontWeight:'800'},photoCredit:{fontSize:8,color:'#969892',marginTop:12},admissionBanner:{marginHorizontal:'5.5%',paddingHorizontal:'5%',paddingVertical:35,backgroundColor:C.green,flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:28,overflow:'hidden',position:'relative'},admissionBannerMobile:{marginHorizontal:12,paddingHorizontal:24,paddingVertical:28,flexDirection:'column',alignItems:'flex-start'},admissionOrnament:{position:'absolute',right:'21%',top:-118,width:240,height:240,borderRadius:140,borderWidth:1,borderColor:'rgba(255,255,255,.2)'},admissionCopy:{maxWidth:570},admissionTitle:{fontSize:25,lineHeight:31,color:'#fff',fontWeight:'800'},admissionBody:{fontSize:10,color:'rgba(255,255,255,.8)',marginTop:6},visit:{paddingHorizontal:'8%',paddingVertical:83,flexDirection:'row',alignItems:'center',gap:65},visitMobile:{paddingHorizontal:24,paddingVertical:61,flexDirection:'column',alignItems:'stretch',gap:30},visitCopy:{flex:1,width:'100%'},visitTitle:{fontSize:33,lineHeight:39,color:C.ink,fontWeight:'800',letterSpacing:-.8},addressRow:{flexDirection:'row',alignItems:'flex-start',gap:11,marginTop:15},addressIcon:{color:C.orange,fontSize:16},address:{flex:1,fontSize:10,lineHeight:18,color:'#626763'},phone:{fontSize:12,color:C.ink,fontWeight:'800'},map:{flex:1,height:350,minWidth:280,width:'100%',overflow:'hidden',backgroundColor:'#e4e7e3'},mapFallback:{flex:1,alignItems:'center',justifyContent:'center',padding:24},mapIcon:{fontSize:30,color:C.green},mapName:{fontSize:14,color:C.ink,fontWeight:'800',textAlign:'center',marginTop:9},mapFallbackButton:{},footer:{minHeight:100,paddingHorizontal:'5.5%',paddingVertical:22,backgroundColor:'#20211f',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:17,flexWrap:'wrap'},footerMobile:{paddingHorizontal:23},footerBrand:{flexDirection:'row',alignItems:'center',gap:10},footerCrest:{width:36,height:36,borderRadius:20,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#a89068'},footerName:{fontSize:9,color:'#fff',fontWeight:'800',letterSpacing:.7},footerSub:{fontSize:8,color:'#adaeaa',marginTop:4},footerPhone:{fontSize:10,color:'#f6b486',fontWeight:'700'},copyright:{fontSize:8,color:'#999b97'},mapName:{fontSize:14,color:C.ink,fontWeight:'800',textAlign:'center',marginTop:9}
});

Object.assign(s, StyleSheet.create({
  page:{width:'100%',maxWidth:'100%',alignSelf:'stretch'},
  app:{flex:1,width:'100%',maxWidth:'100%',overflow:'hidden'},
  heroCarousel:{flex:1,width:'100%',height:'100%'},
  heroImage:{flex:1,width:'100%',height:'100%',minHeight:0,justifyContent:'space-between',backgroundColor:'#ddd'},
  carouselArrow:{position:'absolute',top:'45%',height:38,width:38,borderRadius:20,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(23,23,21,.58)'},
  carouselArrowLeft:{left:13},carouselArrowRight:{right:27},
  carouselArrowText:{color:'#fff',fontSize:27,lineHeight:30,fontWeight:'800'},
  carouselDots:{position:'absolute',right:55,bottom:13,flexDirection:'row',alignItems:'center',gap:7},
  carouselDot:{width:7,height:7,borderRadius:5,backgroundColor:'rgba(255,255,255,.65)',borderWidth:1,borderColor:'rgba(0,0,0,.12)'},
  carouselDotActive:{width:20,backgroundColor:C.orange,borderColor:C.orange},
  utilityName:{fontSize:10}, utilityLink:{fontSize:10}, navText:{fontSize:12,fontWeight:'600'},
  crest:{backgroundColor:C.blue,borderColor:'#c9a967',borderWidth:2},
  crestLetter:{color:'#fff',fontFamily:Platform.OS==='web'?'Georgia':undefined,fontSize:23,lineHeight:25},
  crestBook:{width:17,height:5,borderTopWidth:1,borderColor:'#e6d4a8',marginTop:-1},
  brandName:{fontSize:21,letterSpacing:1.15,fontWeight:'600'},brandSub:{fontSize:8.5,letterSpacing:.7},
  actionText:{fontSize:13,fontWeight:'600'},label:{fontSize:10,marginBottom:8},labelInverse:{color:'#fff'},
  heroDescription:{fontSize:15,lineHeight:25},learnLinkText:{fontSize:12},
  quickTitle:{fontSize:13},quickSub:{fontSize:10},quickNo:{fontSize:9},
  studentFeature:{marginHorizontal:'8%',paddingVertical:28,paddingHorizontal:35,backgroundColor:'#edf3ef',flexDirection:'row',alignItems:'center',gap:28,borderLeftWidth:4,borderLeftColor:C.green},
  studentFeatureMobile:{marginHorizontal:20,paddingVertical:22,paddingHorizontal:22,gap:15},
  studentNumberWrap:{minWidth:125,flexDirection:'row',alignItems:'flex-start'},
  studentNumber:{fontSize:60,lineHeight:66,color:C.green,fontWeight:'900',letterSpacing:-2},
  studentPlus:{fontSize:27,color:C.orange,fontWeight:'900',marginTop:8},
  studentText:{flex:1},studentTitle:{fontSize:21,color:C.ink,fontWeight:'800'},
  studentCaption:{fontSize:12,lineHeight:19,color:C.muted,marginTop:4},
  studentMark:{height:47,width:47,borderRadius:24,backgroundColor:C.white,alignItems:'center',justifyContent:'center'},
  studentMarkGlyph:{fontSize:24,color:C.orange},
  body:{fontSize:14,lineHeight:23},bodyLarge:{fontSize:16,lineHeight:27},
  learningRowText:{fontSize:12},learningNo:{fontSize:10},
  storyIntro:{fontSize:13,lineHeight:21},
  storyCard:{flex:1,minHeight:280,backgroundColor:C.white,borderWidth:1,borderColor:C.line},
  storyCardMobile:{height:305,width:'100%'},
  storyImageArea:{height:210,width:'100%',backgroundColor:'#efede8',padding:7,alignItems:'center',justifyContent:'center'},
  storyImage:{width:'100%',height:'100%',backgroundColor:'#efede8'},
  storyText:{paddingHorizontal:15,paddingVertical:13,backgroundColor:C.white,minHeight:70},
  storyTitle:{fontSize:13,color:C.ink,fontWeight:'800'},
  photoCredit:{fontSize:10,marginTop:15},
  achievements:{paddingHorizontal:'8%',paddingVertical:70,backgroundColor:'#f0ede7',flexDirection:'row',alignItems:'center',gap:55},
  achievementsMobile:{paddingHorizontal:24,paddingVertical:50,flexDirection:'column',alignItems:'stretch',gap:25},
  achievementIntro:{flex:1,maxWidth:440},
  achievementPhotoWrap:{flex:1,width:'100%',backgroundColor:C.white,padding:12,borderWidth:1,borderColor:'#e4ded4'},
  achievementPhoto:{width:'100%',height:300,backgroundColor:'#f4f1ec'},
  achievementCaption:{paddingTop:12},
  achievementCaptionTitle:{fontSize:15,color:C.ink,fontWeight:'800'},
  achievementCaptionSub:{fontSize:11,lineHeight:17,color:C.muted,marginTop:5},
  admissionBody:{fontSize:14,lineHeight:22,color:'#fff'},admissionTitle:{fontSize:28,lineHeight:35},address:{fontSize:12,lineHeight:20},
  phone:{fontSize:14},footerCrest:{backgroundColor:C.blue,borderWidth:2},footerName:{fontSize:10},footerSub:{fontSize:9},footerPhone:{fontSize:11},copyright:{fontSize:9}
}));

