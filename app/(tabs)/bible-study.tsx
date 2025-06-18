import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { SpiritualCard, ProgressRing } from '@/components/SpiritualCard';
import { CircleCheck as CheckCircle, Circle, Users, Download, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedFont } from '@/utils/fonts';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function BibleStudyScreen() {
  const { t } = useLanguage();
  const { getFontFamily, getTitleFont } = useLocalizedFont();
  const [completedStudies, setCompletedStudies] = useState<number[]>([1, 3, 5]);

  const bibleStudies = [
    { id: 1, title: "Foundations of Faith", chapters: 12, completed: true, difficulty: "Beginner" },
    { id: 2, title: "The Life of Jesus", chapters: 15, completed: false, difficulty: "Intermediate" },
    { id: 3, title: "Psalms and Worship", chapters: 8, completed: true, difficulty: "Beginner" },
    { id: 4, title: "Parables and Teachings", chapters: 10, completed: false, difficulty: "Intermediate" },
    { id: 5, title: "Letters to the Churches", chapters: 14, completed: true, difficulty: "Advanced" },
    { id: 6, title: "Prophecies and Revelation", chapters: 18, completed: false, difficulty: "Advanced" },
  ];

  const progressStats = {
    totalStudies: bibleStudies.length,
    completed: completedStudies.length,
    inProgress: 2,
    totalChapters: bibleStudies.reduce((sum, study) => sum + study.chapters, 0),
    completedChapters: bibleStudies
      .filter(study => completedStudies.includes(study.id))
      .reduce((sum, study) => sum + study.chapters, 0)
  };

  const overallProgress = (progressStats.completed / progressStats.totalStudies) * 100;

  const toggleStudyCompletion = (studyId: number) => {
    setCompletedStudies(prev => 
      prev.includes(studyId) 
        ? prev.filter(id => id !== studyId)
        : [...prev, studyId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return Colors.success;
      case 'Intermediate': return Colors.warning;
      case 'Advanced': return Colors.error;
      default: return Colors.muted;
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return t('beginner');
      case 'Intermediate': return t('intermediate');
      case 'Advanced': return t('advanced');
      default: return difficulty;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { fontFamily: getTitleFont('SemiBold') }]}>
              {t('bibleStudyTitle')}
            </Text>
            <Text style={[styles.subtitle, { fontFamily: getFontFamily('Regular') }]}>
              {t('bibleStudySubtitle')}
            </Text>
          </View>
          <LanguageToggle />
        </View>

        {/* Progress Overview */}
        <SpiritualCard style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { fontFamily: getFontFamily('SemiBold') }]}>
              {t('yourProgress')}
            </Text>
            <ProgressRing progress={overallProgress} size={70} />
          </View>
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { fontFamily: getFontFamily('Bold') }]}>
                {progressStats.completed}
              </Text>
              <Text style={[styles.statLabel, { fontFamily: getFontFamily('Regular') }]}>
                {t('completed')}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { fontFamily: getFontFamily('Bold') }]}>
                {progressStats.inProgress}
              </Text>
              <Text style={[styles.statLabel, { fontFamily: getFontFamily('Regular') }]}>
                {t('inProgress')}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { fontFamily: getFontFamily('Bold') }]}>
                {progressStats.completedChapters}
              </Text>
              <Text style={[styles.statLabel, { fontFamily: getFontFamily('Regular') }]}>
                {t('chaptersDone')}
              </Text>
            </View>
          </View>
        </SpiritualCard>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => router.push('/family-tracker')}
          >
            <Users size={20} color={Colors.softGold} />
            <Text style={[styles.actionBtnText, { fontFamily: getFontFamily('Medium') }]}>
              {t('familyStudy')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => router.push('/doctrines')}
          >
            <Download size={20} color={Colors.softGold} />
            <Text style={[styles.actionBtnText, { fontFamily: getFontFamily('Medium') }]}>
              {t('downloadGuides')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Study List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('availableStudies')}
          </Text>
          
          {bibleStudies.map((study) => (
            <SpiritualCard 
              key={study.id} 
              style={styles.studyCard}
            >
              <View style={styles.studyHeader}>
                <TouchableOpacity 
                  onPress={() => toggleStudyCompletion(study.id)}
                  style={styles.checkboxContainer}
                >
                  {completedStudies.includes(study.id) ? (
                    <CheckCircle size={24} color={Colors.success} />
                  ) : (
                    <Circle size={24} color={Colors.muted} />
                  )}
                </TouchableOpacity>
                
                <View style={styles.studyInfo}>
                  <Text style={[
                    styles.studyTitle,
                    { fontFamily: getFontFamily('SemiBold') },
                    completedStudies.includes(study.id) && styles.completedText
                  ]}>
                    {study.title}
                  </Text>
                  <View style={styles.studyMeta}>
                    <Text style={[styles.studyChapters, { fontFamily: getFontFamily('Regular') }]}>
                      {study.chapters} {t('chapters')}
                    </Text>
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(study.difficulty) }
                    ]}>
                      <Text style={[styles.difficultyText, { fontFamily: getFontFamily('Medium') }]}>
                        {getDifficultyText(study.difficulty)}
                      </Text>
                    </View>
                  </View>
                </View>
                
                {completedStudies.includes(study.id) && (
                  <Star size={20} color={Colors.softGold} fill={Colors.softGold} />
                )}
              </View>
            </SpiritualCard>
          ))}
        </View>

        {/* Recommendations */}
        <SpiritualCard style={styles.recommendationCard}>
          <Text style={[styles.recommendationTitle, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('recommendedForYou')}
          </Text>
          <Text style={[styles.recommendationText, { fontFamily: getFontFamily('Regular') }]}>
            {t('recommendationText')}
          </Text>
          <TouchableOpacity style={styles.recommendationButton}>
            <Text style={[styles.recommendationButtonText, { fontFamily: getFontFamily('SemiBold') }]}>
              {t('startStudy')}
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
  title: {
    fontSize: 28,
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondary,
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
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 0.48,
    borderWidth: 1,
    borderColor: Colors.lightGold,
  },
  actionBtnText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 16,
  },
  studyCard: {
    marginBottom: 12,
  },
  studyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 16,
  },
  studyInfo: {
    flex: 1,
  },
  studyTitle: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 6,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: Colors.muted,
  },
  studyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  studyChapters: {
    fontSize: 14,
    color: Colors.secondary,
  },
  difficultyBadge: {
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  difficultyText: {
    fontSize: 10,
    color: Colors.warmWhite,
    textTransform: 'uppercase',
  },
  recommendationCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 20,
  },
  recommendationTitle: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 12,
  },
  recommendationText: {
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  recommendationButton: {
    backgroundColor: Colors.softGold,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  recommendationButtonText: {
    fontSize: 14,
    color: Colors.warmWhite,
  },
});