import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { SpiritualCard } from '@/components/SpiritualCard';
import { ArrowLeft, Download, FileText, Star, Book, Cross, Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedFont } from '@/utils/fonts';

export default function DoctrinesScreen() {
  const { t } = useLanguage();
  const { getFontFamily, getTitleFont } = useLocalizedFont();

  // The Five Solas - Foundational Principles
  const fiveSolas = [
    {
      id: 1,
      title: t('solaScriptura'),
      description: t('solaScripturaDesc'),
      pages: 28,
      downloadCount: 2150,
      size: "1.9 MB",
      category: "Five Solas",
      icon: "book",
      featured: true
    },
    {
      id: 2,
      title: t('solaFide'),
      description: t('solaFideDesc'),
      pages: 24,
      downloadCount: 1890,
      size: "1.6 MB",
      category: "Five Solas",
      icon: "heart",
      featured: true
    },
    {
      id: 3,
      title: t('solaGratia'),
      description: t('solaGratiaDesc'),
      pages: 26,
      downloadCount: 1750,
      size: "1.7 MB",
      category: "Five Solas",
      icon: "heart",
      featured: true
    },
    {
      id: 4,
      title: t('soluschristus'),
      description: t('soluschristusDesc'),
      pages: 32,
      downloadCount: 2050,
      size: "2.1 MB",
      category: "Five Solas",
      icon: "cross",
      featured: true
    },
    {
      id: 5,
      title: t('soliDeoGloria'),
      description: t('soliDeoGloriaDesc'),
      pages: 30,
      downloadCount: 1680,
      size: "2.0 MB",
      category: "Five Solas",
      icon: "star",
      featured: true
    }
  ];

  // Core Doctrines
  const coreDoctrines = [
    {
      id: 6,
      title: t('doctrineOfSalvation'),
      description: t('doctrineOfSalvationDesc'),
      pages: 45,
      downloadCount: 1250,
      size: "2.3 MB",
      category: "Core Doctrine",
      featured: false
    },
    {
      id: 7,
      title: t('doctrineOfTrinity'),
      description: t('doctrineOfTrinityDesc'),
      pages: 38,
      downloadCount: 1567,
      size: "2.1 MB",
      category: "Theology",
      featured: false
    },
    {
      id: 8,
      title: t('doctrineOfCreation'),
      description: t('doctrineOfCreationDesc'),
      pages: 42,
      downloadCount: 1024,
      size: "2.4 MB",
      category: "Theology",
      featured: false
    },
    {
      id: 9,
      title: t('doctrineOfAtonement'),
      description: t('doctrineOfAtonementDesc'),
      pages: 36,
      downloadCount: 892,
      size: "2.0 MB",
      category: "Soteriology",
      featured: false
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book': return <Book size={20} color={Colors.softGold} />;
      case 'heart': return <Heart size={20} color={Colors.softGold} />;
      case 'cross': return <Cross size={20} color={Colors.softGold} />;
      case 'star': return <Star size={20} color={Colors.softGold} />;
      default: return <FileText size={20} color={Colors.softGold} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { fontFamily: getTitleFont('SemiBold') }]}>
              {t('churchDoctrines')}
            </Text>
            <Text style={[styles.subtitle, { fontFamily: getFontFamily('Regular') }]}>
              {t('doctrinesSubtitle')}
            </Text>
          </View>
        </View>

        {/* The Five Solas Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <View style={styles.sectionIconContainer}>
              <Star size={24} color={Colors.softGold} fill={Colors.softGold} />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={[styles.sectionTitle, { fontFamily: getFontFamily('Bold') }]}>
                {t('fiveSolas')}
              </Text>
              <Text style={[styles.sectionSubtitle, { fontFamily: getFontFamily('Regular') }]}>
                {t('fiveSolasSubtitle')}
              </Text>
            </View>
          </View>
          
          {fiveSolas.map((doctrine) => (
            <SpiritualCard key={doctrine.id} style={styles.solaCard}>
              <View style={styles.solaHeader}>
                <View style={styles.solaIconContainer}>
                  {getIcon(doctrine.icon)}
                </View>
                <View style={styles.solaContent}>
                  <Text style={[styles.solaTitle, { fontFamily: getFontFamily('SemiBold') }]}>
                    {doctrine.title}
                  </Text>
                  <Text style={[styles.solaDescription, { fontFamily: getFontFamily('Regular') }]}>
                    {doctrine.description}
                  </Text>
                </View>
              </View>
              
              <View style={styles.doctrineFooter}>
                <View style={styles.doctrineStats}>
                  <View style={styles.infoItem}>
                    <FileText size={12} color={Colors.muted} />
                    <Text style={[styles.infoTextSmall, { fontFamily: getFontFamily('Regular') }]}>
                      {doctrine.pages} {t('pages')}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Download size={12} color={Colors.muted} />
                    <Text style={[styles.infoTextSmall, { fontFamily: getFontFamily('Regular') }]}>
                      {doctrine.downloadCount}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <Download size={14} color={Colors.warmWhite} />
                  <Text style={[styles.downloadButtonText, { fontFamily: getFontFamily('SemiBold') }]}>
                    {doctrine.size}
                  </Text>
                </TouchableOpacity>
              </View>
            </SpiritualCard>
          ))}
        </View>

        {/* Core Doctrines Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <View style={styles.sectionIconContainer}>
              <Book size={24} color={Colors.softGold} />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={[styles.sectionTitle, { fontFamily: getFontFamily('Bold') }]}>
                {t('coreDoctrines')}
              </Text>
            </View>
          </View>
          
          {coreDoctrines.map((doctrine) => (
            <SpiritualCard key={doctrine.id} style={styles.doctrineCard}>
              <View style={styles.doctrineHeader}>
                <View style={styles.doctrineMain}>
                  <Text style={[styles.doctrineTitle, { fontFamily: getFontFamily('SemiBold') }]}>
                    {doctrine.title}
                  </Text>
                  <Text style={[styles.doctrineCategory, { fontFamily: getFontFamily('Medium') }]}>
                    {doctrine.category}
                  </Text>
                  <Text style={[styles.doctrineDescription, { fontFamily: getFontFamily('Regular') }]}>
                    {doctrine.description}
                  </Text>
                </View>
                <TouchableOpacity style={styles.downloadIcon}>
                  <Download size={20} color={Colors.softGold} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.doctrineFooter}>
                <View style={styles.doctrineStats}>
                  <View style={styles.infoItem}>
                    <FileText size={12} color={Colors.muted} />
                    <Text style={[styles.infoTextSmall, { fontFamily: getFontFamily('Regular') }]}>
                      {doctrine.pages} {t('pages')}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Download size={12} color={Colors.muted} />
                    <Text style={[styles.infoTextSmall, { fontFamily: getFontFamily('Regular') }]}>
                      {doctrine.downloadCount}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.doctrineSize, { fontFamily: getFontFamily('Medium') }]}>
                  {doctrine.size}
                </Text>
              </View>
            </SpiritualCard>
          ))}
        </View>

        {/* Study Guide Info */}
        <SpiritualCard style={styles.infoCard}>
          <Text style={[styles.infoTitle, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('studyGuideAvailable')}
          </Text>
          <Text style={[styles.infoText, { fontFamily: getFontFamily('Regular') }]}>
            {t('studyGuideText')}
          </Text>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={[styles.infoButtonText, { fontFamily: getFontFamily('SemiBold') }]}>
              {t('learnMore')}
            </Text>
          </TouchableOpacity>
        </SpiritualCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.lightGold,
    borderRadius: 16,
    padding: 16,
  },
  sectionIconContainer: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.secondary,
  },
  solaCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.softGold,
  },
  solaHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  solaIconContainer: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
  },
  solaContent: {
    flex: 1,
  },
  solaTitle: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 8,
  },
  solaDescription: {
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
  },
  doctrineCard: {
    marginBottom: 12,
  },
  doctrineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  doctrineMain: {
    flex: 1,
    marginRight: 16,
  },
  doctrineTitle: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 4,
  },
  doctrineCategory: {
    fontSize: 12,
    color: Colors.softGold,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  doctrineDescription: {
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
  },
  downloadIcon: {
    backgroundColor: Colors.lightGold,
    borderRadius: 20,
    padding: 10,
  },
  doctrineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctrineStats: {
    flexDirection: 'row',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoTextSmall: {
    fontSize: 10,
    color: Colors.muted,
    marginLeft: 4,
  },
  doctrineSize: {
    fontSize: 12,
    color: Colors.secondary,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softGold,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  downloadButtonText: {
    fontSize: 12,
    color: Colors.warmWhite,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  infoButton: {
    backgroundColor: Colors.softGold,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  infoButtonText: {
    fontSize: 14,
    color: Colors.warmWhite,
  },
});