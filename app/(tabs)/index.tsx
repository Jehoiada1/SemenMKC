import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { SpiritualCard } from '@/components/SpiritualCard';
import { Book, Download, Users, Play, Calendar, Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedFont } from '@/utils/fonts';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function HomeScreen() {
  const { t } = useLanguage();
  const { getFontFamily, getTitleFont } = useLocalizedFont();

  const featuredSermons = [
    {
      id: 1,
      title: "Walking in Faith",
      speaker: t('pastorFitsum'),
      duration: "45 min",
      thumbnail: "https://images.pexels.com/photos/8468867/pexels-photo-8468867.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 2,
      title: "The Power of Prayer",
      speaker: t('pastorFitsum'),
      duration: "38 min",
      thumbnail: "https://images.pexels.com/photos/8468868/pexels-photo-8468868.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Language Toggle */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.greeting, { fontFamily: getTitleFont('SemiBold') }]}>
              {t('goodMorning')}
            </Text>
            <Text style={[styles.subtitle, { fontFamily: getFontFamily('Regular') }]}>
              {t('welcomeMessage')}
            </Text>
          </View>
          <LanguageToggle />
        </View>

        {/* Daily Verse Card */}
        <SpiritualCard style={styles.verseCard}>
          <Text style={[styles.verseLabel, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('dailyVerse')}
          </Text>
          <Text style={[styles.verseText, { fontFamily: getTitleFont('Regular') }]}>
            "{t('dailyVerseText')}"
          </Text>
          <Text style={[styles.verseReference, { fontFamily: getFontFamily('Medium') }]}>
            — {t('dailyVerseReference')}
          </Text>
        </SpiritualCard>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('quickActions')}
          </Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/bible-study')}
            >
              <Book size={24} color={Colors.softGold} />
              <Text style={[styles.actionText, { fontFamily: getFontFamily('Medium') }]}>
                {t('bibleStudy')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/doctrines')}
            >
              <Download size={24} color={Colors.softGold} />
              <Text style={[styles.actionText, { fontFamily: getFontFamily('Medium') }]}>
                {t('doctrines')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/family-tracker')}
            >
              <Users size={24} color={Colors.softGold} />
              <Text style={[styles.actionText, { fontFamily: getFontFamily('Medium') }]}>
                {t('familyStudy')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Sermons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { fontFamily: getFontFamily('SemiBold') }]}>
              {t('featuredSermons')}
            </Text>
            <TouchableOpacity onPress={() => router.push('/sermons')}>
              <Text style={[styles.seeAllText, { fontFamily: getFontFamily('Medium') }]}>
                {t('seeAll')}
              </Text>
            </TouchableOpacity>
          </View>
          
          {featuredSermons.map((sermon) => (
            <SpiritualCard 
              key={sermon.id} 
              onPress={() => router.push('/sermon-detail')}
              style={styles.sermonCard}
            >
              <View style={styles.sermonContent}>
                <Image source={{ uri: sermon.thumbnail }} style={styles.sermonThumbnail} />
                <View style={styles.sermonInfo}>
                  <Text style={[styles.sermonTitle, { fontFamily: getFontFamily('SemiBold') }]}>
                    {sermon.title}
                  </Text>
                  <Text style={[styles.sermonSpeaker, { fontFamily: getFontFamily('Regular') }]}>
                    {sermon.speaker}
                  </Text>
                  <View style={styles.sermonMeta}>
                    <Play size={14} color={Colors.muted} />
                    <Text style={[styles.sermonDuration, { fontFamily: getFontFamily('Regular') }]}>
                      {sermon.duration}
                    </Text>
                  </View>
                </View>
              </View>
            </SpiritualCard>
          ))}
        </View>

        {/* Prayer Request */}
        <SpiritualCard style={styles.prayerCard}>
          <View style={styles.prayerHeader}>
            <Heart size={20} color={Colors.softGold} />
            <Text style={[styles.prayerTitle, { fontFamily: getFontFamily('SemiBold') }]}>
              {t('prayerRequests')}
            </Text>
          </View>
          <Text style={[styles.prayerText, { fontFamily: getFontFamily('Regular') }]}>
            {t('prayerRequestsDesc')}
          </Text>
          <TouchableOpacity style={styles.prayerButton}>
            <Text style={[styles.prayerButtonText, { fontFamily: getFontFamily('SemiBold') }]}>
              {t('submitPrayerRequest')}
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  headerContent: {
    flex: 1,
    marginRight: 16,
  },
  greeting: {
    fontSize: 28,
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondary,
    lineHeight: 22,
  },
  verseCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 24,
  },
  verseLabel: {
    fontSize: 14,
    color: Colors.warmBrown,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  verseText: {
    fontSize: 18,
    color: Colors.primary,
    lineHeight: 26,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  verseReference: {
    fontSize: 14,
    color: Colors.warmBrown,
    textAlign: 'right',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: Colors.primary,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.softGold,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 0.3,
    borderWidth: 1,
    borderColor: Colors.lightGold,
  },
  actionText: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  sermonCard: {
    marginBottom: 12,
  },
  sermonContent: {
    flexDirection: 'row',
  },
  sermonThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  sermonInfo: {
    flex: 1,
  },
  sermonTitle: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 4,
  },
  sermonSpeaker: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 8,
  },
  sermonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sermonDuration: {
    fontSize: 12,
    color: Colors.muted,
    marginLeft: 6,
  },
  prayerCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 20,
  },
  prayerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  prayerTitle: {
    fontSize: 18,
    color: Colors.primary,
    marginLeft: 8,
  },
  prayerText: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  prayerButton: {
    backgroundColor: Colors.softGold,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  prayerButtonText: {
    fontSize: 14,
    color: Colors.warmWhite,
  },
});