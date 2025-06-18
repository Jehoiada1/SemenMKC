import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    bibleStudy: 'Bible Study',
    sermons: 'Sermons',
    profile: 'Profile',
    
    // Home Screen
    goodMorning: 'Good Morning',
    welcomeMessage: 'እንኳን ወደ ሰሜን አ.አ መሰረተክርስቶስ ቤተ-ክርስቲያን በደህና መጡ',
    dailyVerse: 'Daily Verse',
    dailyVerseText: 'Trust in the Lord with all your heart and lean not on your own understanding.',
    dailyVerseReference: 'Proverbs 3:5',
    quickActions: 'Quick Actions',
    featuredSermons: 'Featured Sermons',
    seeAll: 'See All',
    prayerRequests: 'Prayer Requests',
    prayerRequestsDesc: 'Share your prayer needs with our community',
    submitPrayerRequest: 'Submit Prayer Request',
    doctrines: 'Doctrines',
    familyStudy: 'Family Study',
    
    // Bible Study
    bibleStudyTitle: 'Bible Study',
    bibleStudySubtitle: 'Grow deeper in your faith journey',
    yourProgress: 'Your Progress',
    completed: 'Completed',
    inProgress: 'In Progress',
    chaptersDone: 'Chapters Done',
    downloadGuides: 'Download Guides',
    availableStudies: 'Available Studies',
    chapters: 'chapters',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    recommendedForYou: 'Recommended for You',
    recommendationText: 'Based on your progress, we suggest starting with "The Life of Jesus" to deepen your understanding of Christ\'s ministry.',
    startStudy: 'Start Study',
    
    // Sermons
    sermonsTitle: 'Sermons',
    sermonsSubtitle: 'Listen and watch inspiring messages',
    searchSermons: 'Search sermons...',
    featuredThisWeek: 'Featured This Week',
    allSermons: 'All Sermons',
    loadMoreSermons: 'Load More Sermons',
    views: 'views',
    recent: 'Recent',
    faith: 'Faith',
    prayer: 'Prayer',
    family: 'Family',
    worship: 'Worship',
    all: 'All',
    
    // Profile
    profileTitle: 'Profile',
    yourJourney: 'Your Journey',
    studiesDone: 'Studies Done',
    savedSermons: 'Saved Sermons',
    dayStreak: 'day streak',
    myBibleStudies: 'My Bible Studies',
    downloadedContent: 'Downloaded Content',
    familyStudyTracker: 'Family Study Tracker',
    notifications: 'Notifications',
    recentActivity: 'Recent Activity',
    achievements: 'Achievements',
    firstStudy: 'First Study',
    sevenDayStreak: '7 Day Streak',
    prayerWarrior: 'Prayer Warrior',
    signOut: 'Sign Out',
    
    // Doctrines
    churchDoctrines: 'Church Doctrines',
    doctrinesSubtitle: 'Download and study our foundational teachings',
    fiveSolas: 'The Five Solas',
    fiveSolasSubtitle: 'Foundational Principles of the Reformation',
    coreDoctrines: 'Core Doctrines',
    featuredDocuments: 'Featured Documents',
    featured: 'Featured',
    allDoctrines: 'All Doctrines',
    pages: 'pages',
    downloads: 'downloads',
    downloadPdf: 'Download PDF',
    studyGuideAvailable: 'Study Guide Available',
    studyGuideText: 'Each doctrine comes with discussion questions and practical applications for personal study or group discussions.',
    learnMore: 'Learn More',
    
    // Five Solas
    solaScriptura: 'Sola Scriptura',
    solaScripturaDesc: 'Scripture Alone - The Bible is the ultimate authority for faith and practice, sufficient for all spiritual truth.',
    solaFide: 'Sola Fide',
    solaFideDesc: 'Faith Alone - Salvation is by faith alone, not by works or human effort, but through trust in Christ.',
    solaGratia: 'Sola Gratia',
    solaGratiaDesc: 'Grace Alone - Salvation is entirely by God\'s grace as a free gift, not earned or deserved.',
    soluschristus: 'Solus Christus',
    soluschristusDesc: 'Christ Alone - Jesus Christ is the only mediator between God and humanity, our sole source of salvation.',
    soliDeoGloria: 'Soli Deo Gloria',
    soliDeoGloriaDesc: 'To God\'s Glory Alone - All of life and salvation exists for the glory of God alone.',
    
    // Core Doctrines
    doctrineOfSalvation: 'Doctrine of Salvation',
    doctrineOfSalvationDesc: 'Understanding God\'s plan of redemption through Jesus Christ and the process of sanctification.',
    doctrineOfTrinity: 'Doctrine of Trinity',
    doctrineOfTrinityDesc: 'The biblical teaching of one God existing in three persons: Father, Son, and Holy Spirit.',
    doctrineOfCreation: 'Doctrine of Creation',
    doctrineOfCreationDesc: 'God\'s sovereign act of creating the universe and humanity in His image for His glory.',
    doctrineOfAtonement: 'Doctrine of Atonement',
    doctrineOfAtonementDesc: 'Christ\'s sacrificial death on the cross as the payment for sin and reconciliation with God.',
    
    // Family Tracker
    familyStudyTrackerTitle: 'Family Study Tracker',
    familyTrackerSubtitle: 'Track your family\'s spiritual journey together',
    members: 'members',
    activeStudies: 'Active Studies',
    weeklyGoal: 'Weekly Goal',
    familyMembers: 'Family Members',
    groupStudies: 'Group Studies',
    participants: 'participants',
    sessions: 'sessions',
    next: 'Next',
    weeklyFamilyChallenge: 'Weekly Family Challenge',
    challengeText: 'Complete 3 family devotion sessions this week. You\'re currently at',
    outOf: 'out of',
    startNewFamilyStudy: 'Start New Family Study',
    
    // Admin
    adminPanel: 'Admin Panel',
    adminSubtitle: 'Manage church content and users',
    overview: 'Overview',
    uploadContent: 'Upload Content',
    adminOverview: 'Admin Overview',
    totalUsers: 'Total Users',
    thisWeek: 'This Week',
    recentUploads: 'Recent Uploads',
    settings: 'Settings',
    analytics: 'Analytics',
    manageUsers: 'Manage Users',
    contentUpload: 'Content Upload',
    uploadSermon: 'Upload Sermon',
    uploadSermonDesc: 'Add new audio or video sermons',
    uploadDoctrine: 'Upload Doctrine',
    uploadDoctrineDesc: 'Add PDF doctrine documents',
    createStudy: 'Create Study',
    chooseFiles: 'Choose Files',
    quickSermonUpload: 'Quick Sermon Upload',
    title: 'Title',
    speaker: 'Speaker',
    category: 'Category',
    enterSermonTitle: 'Enter sermon title',
    enterSpeakerName: 'Enter speaker name',
    uploadPublish: 'Upload & Publish',
    pendingReviews: 'Pending Reviews',
    pendingReviewsText: 'items waiting for review and approval.',
    reviewNow: 'Review Now',
    
    // Pastor Names
    pastorFitsum: 'መምህር ፍፁም ሞላ',
    pastorMekonnen: 'መጋቢ መኮንን ምላሹ',
    
    // User Demo
    userName: 'John',
    userEmail: 'john@gmail.com',
    
    // Common
    back: 'Back',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    close: 'Close',
    open: 'Open',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    
    // Language
    language: 'Language',
    english: 'English',
    amharic: 'አማርኛ',
  },
  am: {
    // Navigation
    home: 'ቤት',
    bibleStudy: 'የመጽሐፍ ቅዱስ ጥናት',
    sermons: 'ስብከቶች',
    profile: 'መገለጫ',
    
    // Home Screen
    goodMorning: 'እንደምን አደሩ',
    welcomeMessage: 'እንኳን ወደ ሰሜን አ.አ መሰረተክርስቶስ ቤተ-ክርስቲያን በደህና መጡ',
    dailyVerse: 'የዕለቱ ቃል',
    dailyVerseText: 'በሙሉ ልብህ በእግዚአብሔር ታመን፤ በራስህም ማስተዋል አትታመን።',
    dailyVerseReference: 'ምሳሌ 3፥5',
    quickActions: 'ፈጣን እርምጃዎች',
    featuredSermons: 'ተመራጭ ስብከቶች',
    seeAll: 'ሁሉንም ይመልከቱ',
    prayerRequests: 'የጸሎት ጥያቄዎች',
    prayerRequestsDesc: 'የጸሎት ፍላጎቶችዎን ከማህበረሰባችን ጋር ያካፍሉ',
    submitPrayerRequest: 'የጸሎት ጥያቄ ያስገቡ',
    doctrines: 'ትምህርቶች',
    familyStudy: 'የቤተሰብ ጥናት',
    
    // Bible Study
    bibleStudyTitle: 'የመጽሐፍ ቅዱስ ጥናት',
    bibleStudySubtitle: 'በእምነት ጉዞዎ ውስጥ ይበልጥ ያድጉ',
    yourProgress: 'የእርስዎ እድገት',
    completed: 'የተጠናቀቀ',
    inProgress: 'በሂደት ላይ',
    chaptersDone: 'የተጠናቀቁ ምዕራፎች',
    downloadGuides: 'መመሪያዎችን ያውርዱ',
    availableStudies: 'ያሉ ጥናቶች',
    chapters: 'ምዕራፎች',
    beginner: 'ጀማሪ',
    intermediate: 'መካከለኛ',
    advanced: 'ከፍተኛ',
    recommendedForYou: 'ለእርስዎ የሚመከር',
    recommendationText: 'በእርስዎ እድገት መሰረት፣ "የኢየሱስ ሕይወት" በመጀመር የክርስቶስን አገልግሎት ለመረዳት እንመክራለን።',
    startStudy: 'ጥናት ይጀምሩ',
    
    // Sermons
    sermonsTitle: 'ስብከቶች',
    sermonsSubtitle: 'አነቃቂ መልእክቶችን ያዳምጡ እና ይመልከቱ',
    searchSermons: 'ስብከቶችን ይፈልጉ...',
    featuredThisWeek: 'የዚህ ሳምንት ተመራጭ',
    allSermons: 'ሁሉም ስብከቶች',
    loadMoreSermons: 'ተጨማሪ ስብከቶች ይጫኑ',
    views: 'እይታዎች',
    recent: 'የቅርብ ጊዜ',
    faith: 'እምነት',
    prayer: 'ጸሎት',
    family: 'ቤተሰብ',
    worship: 'አምልኮ',
    all: 'ሁሉም',
    
    // Profile
    profileTitle: 'መገለጫ',
    yourJourney: 'የእርስዎ ጉዞ',
    studiesDone: 'የተጠናቀቁ ጥናቶች',
    savedSermons: 'የተቀመጡ ስብከቶች',
    dayStreak: 'ቀን ተከታታይ',
    myBibleStudies: 'የእኔ የመጽሐፍ ቅዱስ ጥናቶች',
    downloadedContent: 'የወረደ ይዘት',
    familyStudyTracker: 'የቤተሰብ ጥናት መከታተያ',
    notifications: 'ማሳወቂያዎች',
    recentActivity: 'የቅርብ ጊዜ እንቅስቃሴ',
    achievements: 'ስኬቶች',
    firstStudy: 'የመጀመሪያ ጥናት',
    sevenDayStreak: '7 ቀን ተከታታይ',
    prayerWarrior: 'የጸሎት ተዋጊ',
    signOut: 'ውጣ',
    
    // Doctrines
    churchDoctrines: 'የቤተክርስቲያን ትምህርቶች',
    doctrinesSubtitle: 'መሠረታዊ ትምህርቶቻችንን ያውርዱ እና ያጥኑ',
    fiveSolas: 'አምስቱ ሶላዎች',
    fiveSolasSubtitle: 'የተሐድሶ መሠረታዊ መርሆዎች',
    coreDoctrines: 'ዋና ትምህርቶች',
    featuredDocuments: 'ተመራጭ ሰነዶች',
    featured: 'ተመራጭ',
    allDoctrines: 'ሁሉም ትምህርቶች',
    pages: 'ገጾች',
    downloads: 'ውርዶች',
    downloadPdf: 'PDF ያውርዱ',
    studyGuideAvailable: 'የጥናት መመሪያ አለ',
    studyGuideText: 'እያንዳንዱ ትምህርት ለግል ጥናት ወይም ለቡድን ውይይቶች የውይይት ጥያቄዎች እና ተግባራዊ አተገባበሮች አሉት።',
    learnMore: 'ተጨማሪ ይወቁ',
    
    // Five Solas
    solaScriptura: 'ሶላ ስክሪፕቱራ',
    solaScripturaDesc: 'መጽሐፍ ቅዱስ ብቻ - መጽሐፍ ቅዱስ ለእምነትና ለሕይወት ዋና ሥልጣን፣ ለሁሉም መንፈሳዊ እውነት በቂ ነው።',
    solaFide: 'ሶላ ፊዴ',
    solaFideDesc: 'እምነት ብቻ - መዳን በእምነት ብቻ ነው፣ በሥራ ወይም በሰው ጥረት አይደለም፣ ነገር ግን በክርስቶስ መታመን ነው።',
    solaGratia: 'ሶላ ግራቲያ',
    solaGratiaDesc: 'ጸጋ ብቻ - መዳን ሙሉ በሙሉ በእግዚአብሔር ጸጋ እንደ ነጻ ስጦታ ነው፣ የተገኘ ወይም የተገባ አይደለም።',
    soluschristus: 'ሶሉስ ክርስቱስ',
    soluschristusDesc: 'ክርስቶስ ብቻ - ኢየሱስ ክርስቶስ በእግዚአብሔርና በሰው መካከል ያለው ብቸኛ መካከለኛ፣ የመዳናችን ብቸኛ ምንጭ ነው።',
    soliDeoGloria: 'ሶሊ ዴኦ ግሎሪያ',
    soliDeoGloriaDesc: 'ለእግዚአብሔር ክብር ብቻ - ሁሉም ሕይወትና መዳን ለእግዚአብሔር ክብር ብቻ ነው የሚኖረው።',
    
    // Core Doctrines
    doctrineOfSalvation: 'የመዳን ትምህርት',
    doctrineOfSalvationDesc: 'በኢየሱስ ክርስቶስ የእግዚአብሔርን የቤዛ እቅድና የመቀደስ ሂደት መረዳት።',
    doctrineOfTrinity: 'የሥላሴ ትምህርት',
    doctrineOfTrinityDesc: 'አንድ እግዚአብሔር በሦስት ሰዎች የሚኖር የመጽሐፍ ቅዱስ ትምህርት፡ አብ፣ ወልድና መንፈስ ቅዱስ።',
    doctrineOfCreation: 'የፍጥረት ትምህርት',
    doctrineOfCreationDesc: 'እግዚአብሔር አጽናፈ ሰማይንና ሰውን በራሱ ምስል ለክብሩ የፈጠረበት ሉዓላዊ ተግባር።',
    doctrineOfAtonement: 'የማስታረቅ ትምህርት',
    doctrineOfAtonementDesc: 'የክርስቶስ በመስቀል ላይ የተሰዋ ሞት እንደ ኃጢአት ክፍያና ከእግዚአብሔር ጋር እንደ ማስታረቅ።',
    
    // Family Tracker
    familyStudyTrackerTitle: 'የቤተሰብ ጥናት መከታተያ',
    familyTrackerSubtitle: 'የቤተሰብዎን መንፈሳዊ ጉዞ አብረው ይከታተሉ',
    members: 'አባላት',
    activeStudies: 'ንቁ ጥናቶች',
    weeklyGoal: 'ሳምንታዊ ግብ',
    familyMembers: 'የቤተሰብ አባላት',
    groupStudies: 'የቡድን ጥናቶች',
    participants: 'ተሳታፊዎች',
    sessions: 'ክፍለ ጊዜዎች',
    next: 'ቀጣይ',
    weeklyFamilyChallenge: 'ሳምንታዊ የቤተሰብ ፈተና',
    challengeText: 'በዚህ ሳምንት 3 የቤተሰብ ምሳሌ ክፍለ ጊዜዎችን ይጨርሱ። አሁን እርስዎ በ',
    outOf: 'ከ',
    startNewFamilyStudy: 'አዲስ የቤተሰብ ጥናት ይጀምሩ',
    
    // Admin
    adminPanel: 'የአስተዳዳሪ ፓነል',
    adminSubtitle: 'የቤተክርስቲያን ይዘት እና ተጠቃሚዎችን ያስተዳድሩ',
    overview: 'አጠቃላይ እይታ',
    uploadContent: 'ይዘት ይስቀሉ',
    adminOverview: 'የአስተዳዳሪ አጠቃላይ እይታ',
    totalUsers: 'ጠቅላላ ተጠቃሚዎች',
    thisWeek: 'በዚህ ሳምንት',
    recentUploads: 'የቅርብ ጊዜ ስቀላዎች',
    settings: 'ቅንብሮች',
    analytics: 'ትንታኔዎች',
    manageUsers: 'ተጠቃሚዎችን ያስተዳድሩ',
    contentUpload: 'ይዘት ስቀላ',
    uploadSermon: 'ስብከት ይስቀሉ',
    uploadSermonDesc: 'አዲስ የድምጽ ወይም የቪዲዮ ስብከቶች ይጨምሩ',
    uploadDoctrine: 'ትምህርት ይስቀሉ',
    uploadDoctrineDesc: 'የPDF ትምህርት ሰነዶች ይጨምሩ',
    createStudy: 'ጥናት ይፍጠሩ',
    chooseFiles: 'ፋይሎች ይምረጡ',
    quickSermonUpload: 'ፈጣን ስብከት ስቀላ',
    title: 'ርዕስ',
    speaker: 'ተናጋሪ',
    category: 'ምድብ',
    enterSermonTitle: 'የስብከት ርዕስ ያስገቡ',
    enterSpeakerName: 'የተናጋሪ ስም ያስገቡ',
    uploadPublish: 'ይስቀሉ እና ያትሙ',
    pendingReviews: 'በመጠባበቅ ላይ ያሉ ግምገማዎች',
    pendingReviewsText: 'ንጥሎች ለግምገማ እና ለማጽደቅ በመጠባበቅ ላይ።',
    reviewNow: 'አሁን ይገምግሙ',
    
    // Pastor Names
    pastorFitsum: 'መምህር ፍፁም ሞላ',
    pastorMekonnen: 'መጋቢ መኮንን ምላሹ',
    
    // User Demo
    userName: 'ዮሐንስ',
    userEmail: 'john@gmail.com',
    
    // Common
    back: 'ተመለስ',
    loading: 'በመጫን ላይ...',
    error: 'ስህተት',
    retry: 'እንደገና ሞክር',
    cancel: 'ሰርዝ',
    save: 'አስቀምጥ',
    delete: 'ሰርዝ',
    edit: 'አርም',
    add: 'ጨምር',
    remove: 'አስወግድ',
    close: 'ዝጋ',
    open: 'ክፈት',
    yes: 'አዎ',
    no: 'አይ',
    ok: 'እሺ',
    
    // Language
    language: 'ቋንቋ',
    english: 'English',
    amharic: 'አማርኛ',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'am')) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}