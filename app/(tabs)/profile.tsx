import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { SpiritualCard, ProgressRing } from '@/components/SpiritualCard';
import { Settings, BookOpen, Heart, Download, Award, Calendar, Bell, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedFont } from '@/utils/fonts';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function ProfileScreen() {
  const { t, language } = useLanguage();
  const { getFontFamily, getTitleFont } = useLocalizedFont();

  const userStats = {
    studiesCompleted: 8,
    totalStudies: 15,
    savedSermons: 12,
    prayerRequests: 3,
    dayStreak: 15,
  };

  const recentActivity = [
    { id: 1, type: 'study', title: 'Completed "Foundations of Faith"', date: '2 days ago' },
    { id: 2, type: 'sermon', title: 'Saved "Walking in Faith"', date: '3 days ago' },
    { id: 3, type: 'prayer', title: 'Submitted prayer request', date: '5 days ago' },
    { id: 4, type: 'study', title: 'Started "The Life of Jesus"', date: '1 week ago' },
  ];

  const studyProgress = (userStats.studiesCompleted / userStats.totalStudies) * 100;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'study': return <BookOpen size={16} color={Colors.softGold} />;
      case 'sermon': return <Heart size={16} color={Colors.error} />;
      case 'prayer': return <Heart size={16} color={Colors.success} />;
      default: return <BookOpen size={16} color={Colors.muted} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Language Toggle */}
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, { fontFamily: getTitleFont('SemiBold') }]}>
            {t('profileTitle')}
          </Text>
          <LanguageToggle />
        </View>

        {/* Profile Header */}
        <SpiritualCard style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { fontFamily: getFontFamily('SemiBold') }]}>
                {t('userName')}
              </Text>
              <Text style={[styles.profileEmail, { fontFamily: getFontFamily('Regular') }]}>
                {t('userEmail')}
              </Text>
              <View style={styles.streakContainer}>
                <Award size={16} color={Colors.softGold} />
                <Text style={[styles.streakText, { fontFamily: getFontFamily('Medium') }]}>
                  {userStats.dayStreak} {t('dayStreak')}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={20} color={Colors.muted} />
            </TouchableOpacity>
          </View>
        </SpiritualCard>

        {/* Progress Overview */}
        <SpiritualCard style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { fontFamily: getFontFamily('SemiBold') }]}>
              {t('yourJourney')}
            </Text>
            <ProgressRing progress={studyProgress} size={70} />
          </View>
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { fontFamily: getFontFamily('Bold') }]}>
                {userStats.studiesCompleted}
              </Text>
              <Text style={[styles.statLabel, { fontFamily: getFontFamily('Regular') }]}>
                {t('studiesDone')}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { fontFamily: getFontFamily('Bold') }]}>
                {userStats.savedSermons}
              </Text>
              <Text style={[styles.statLabel, { fontFamily: getFontFamily('Regular') }]}>
                {t('savedSermons')}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { fontFamily: getFontFamily('Bold') }]}>
                {userStats.prayerRequests}
              </Text>
              <Text style={[styles.statLabel, { fontFamily: getFontFamily('Regular') }]}>
                {t('prayerRequests')}
              </Text>
            </View>
          </View>
        </SpiritualCard>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <BookOpen size={20} color={Colors.softGold} />
            <Text style={[styles.menuText, { fontFamily: getFontFamily('Medium') }]}>
              {t('myBibleStudies')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Heart size={20} color={Colors.softGold} />
            <Text style={[styles.menuText, { fontFamily: getFontFamily('Medium') }]}>
              {t('savedSermons')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Download size={20} color={Colors.softGold} />
            <Text style={[styles.menuText, { fontFamily: getFontFamily('Medium') }]}>
              {t('downloadedContent')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/family-tracker')}
          >
            <Calendar size={20} color={Colors.softGold} />
            <Text style={[styles.menuText, { fontFamily: getFontFamily('Medium') }]}>
              {t('familyStudyTracker')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Bell size={20} color={Colors.softGold} />
            <Text style={[styles.menuText, { fontFamily: getFontFamily('Medium') }]}>
              {t('notifications')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('recentActivity')}
          </Text>
          
          {recentActivity.map((activity) => (
            <SpiritualCard key={activity.id} style={styles.activityCard}>
              <View style={styles.activityContent}>
                <View style={styles.activityIcon}>
                  {getActivityIcon(activity.type)}
                </View>
                <View style={styles.activityInfo}>
                  <Text style={[styles.activityTitle, { fontFamily: getFontFamily('Medium') }]}>
                    {activity.title}
                  </Text>
                  <Text style={[styles.activityDate, { fontFamily: getFontFamily('Regular') }]}>
                    {activity.date}
                  </Text>
                </View>
              </View>
            </SpiritualCard>
          ))}
        </View>

        {/* Achievements */}
        <SpiritualCard style={styles.achievementsCard}>
          <Text style={[styles.achievementsTitle, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('achievements')}
          </Text>
          <View style={styles.achievementsGrid}>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <BookOpen size={20} color={Colors.softGold} />
              </View>
              <Text style={[styles.achievementText, { fontFamily: getFontFamily('Medium') }]}>
                {t('firstStudy')}
              </Text>
            </View>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Award size={20} color={Colors.softGold} />
              </View>
              <Text style={[styles.achievementText, { fontFamily: getFontFamily('Medium') }]}>
                {t('sevenDayStreak')}
              </Text>
            </View>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Heart size={20} color={Colors.softGold} />
              </View>
              <Text style={[styles.achievementText, { fontFamily: getFontFamily('Medium') }]}>
                {t('prayerWarrior')}
              </Text>
            </View>
          </View>
        </SpiritualCard>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton}>
          <LogOut size={18} color={Colors.error} />
          <Text style={[styles.signOutText, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('signOut')}
          </Text>
        </TouchableOpacity>
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
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    color: Colors.primary,
  },
  profileCard: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 8,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 12,
    color: Colors.softGold,
    marginLeft: 6,
  },
  settingsButton: {
    padding: 8,
  },
  progressCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    color: Colors.primary,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    color: Colors.softGold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.secondary,
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.lightGold,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.softGray,
  },
  menuText: {
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 16,
  },
  activityCard: {
    marginBottom: 8,
    paddingVertical: 16,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.lightGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: Colors.muted,
  },
  achievementsCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 20,
  },
  achievementsTitle: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievementItem: {
    alignItems: 'center',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.warmWhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 10,
    color: Colors.secondary,
    textAlign: 'center',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  signOutText: {
    fontSize: 16,
    color: Colors.error,
    marginLeft: 8,
  },
});