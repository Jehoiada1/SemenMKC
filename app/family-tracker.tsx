import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { SpiritualCard, ProgressRing } from '@/components/SpiritualCard';
import { CircleCheck as CheckCircle, Lock, BookOpen, Star, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedFont } from '@/utils/fonts';
import { supabase } from '@/utils/supabase';

interface FamilyStudy {
  id: number;
  title: string;
  chapters: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  difficulty: string;
  description: string;
  progress: number;
}

export default function FamilyTrackerScreen() {
  const { t } = useLanguage();
  const { getFontFamily, getTitleFont } = useLocalizedFont();
  const [familyStudies, setFamilyStudies] = useState<FamilyStudy[]>([]);
  const [userProgress, setUserProgress] = useState({
    completedStudies: 0,
    totalStudies: 0,
    completedChapters: 0,
    totalChapters: 0,
  });

  useEffect(() => {
    loadStudiesData();
  }, []);

  const loadStudiesData = async () => {
    try {
      const studies: FamilyStudy[] = [
        {
          id: 7,
          title: "Family Devotions",
          chapters: 12,
          isCompleted: false,
          isUnlocked: true,
          difficulty: "Beginner",
          description: "Build strong spiritual foundations together as a family",
          progress: 0
        },
        {
          id: 8,
          title: "Parenting with Grace",
          chapters: 10,
          isCompleted: false,
          isUnlocked: false,
          difficulty: "Intermediate",
          description: "Learn biblical principles for raising children in faith",
          progress: 0
        },
        {
          id: 9,
          title: "Marriage and Unity",
          chapters: 8,
          isCompleted: false,
          isUnlocked: false,
          difficulty: "Intermediate",
          description: "Strengthen your marriage through God's Word",
          progress: 0
        },
        {
          id: 10,
          title: "Family Worship",
          chapters: 12,
          isCompleted: false,
          isUnlocked: false,
          difficulty: "Beginner",
          description: "Create meaningful worship experiences at home",
          progress: 0
        },
        {
          id: 11,
          title: "Teaching Faith to Children",
          chapters: 15,
          isCompleted: false,
          isUnlocked: false,
          difficulty: "Intermediate",
          description: "Pass on your faith to the next generation",
          progress: 0
        },
        {
          id: 12,
          title: "Family Prayer Life",
          chapters: 10,
          isCompleted: false,
          isUnlocked: false,
          difficulty: "Advanced",
          description: "Develop a powerful family prayer practice",
          progress: 0
        },
      ];

      const { data: progressData } = await supabase
        .from('user_study_progress')
        .select('study_id, chapter_id, is_chapter_complete')
        .in('study_id', [7, 8, 9, 10, 11, 12])
        .order('study_id, chapter_id');

      if (progressData) {
        studies.forEach(study => {
          const studyProgress = progressData.filter(p => p.study_id === study.id);
          const completedChapters = studyProgress.filter(p => p.is_chapter_complete).length;

          study.progress = (completedChapters / study.chapters) * 100;
          study.isCompleted = completedChapters === study.chapters;

          if (study.isCompleted && study.id < 12) {
            const nextStudy = studies.find(s => s.id === study.id + 1);
            if (nextStudy) {
              nextStudy.isUnlocked = true;
            }
          }
        });

        const totalCompleted = studies.filter(s => s.isCompleted).length;
        const totalChaptersCompleted = progressData.filter(p => p.is_chapter_complete).length;
        const totalChapters = studies.reduce((sum, study) => sum + study.chapters, 0);

        setUserProgress({
          completedStudies: totalCompleted,
          totalStudies: studies.length,
          completedChapters: totalChaptersCompleted,
          totalChapters: totalChapters,
        });
      }

      setFamilyStudies(studies);
    } catch (error) {
      console.log('Error loading family studies data:', error);
    }
  };

  const openStudy = (study: FamilyStudy) => {
    if (!study.isUnlocked) {
      return;
    }
    router.push(`/study/${study.id}`);
  };

  const overallProgress = userProgress.totalStudies > 0
    ? (userProgress.completedStudies / userProgress.totalStudies) * 100
    : 0;

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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { fontFamily: getTitleFont('SemiBold') }]}>
              {t('familyStudy')}
            </Text>
            <Text style={[styles.subtitle, { fontFamily: getFontFamily('Regular') }]}>
              {t('familyStudySubtitle')}
            </Text>
          </View>
        </View>

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
                {userProgress.completedStudies}
              </Text>
              <Text style={[styles.statLabel, { fontFamily: getFontFamily('Regular') }]}>
                {t('completed')}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { fontFamily: getFontFamily('Bold') }]}>
                {familyStudies.filter(s => s.isUnlocked && !s.isCompleted).length}
              </Text>
              <Text style={[styles.statLabel, { fontFamily: getFontFamily('Regular') }]}>
                {t('available')}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { fontFamily: getFontFamily('Bold') }]}>
                {userProgress.completedChapters}
              </Text>
              <Text style={[styles.statLabel, { fontFamily: getFontFamily('Regular') }]}>
                {t('chaptersDone')}
              </Text>
            </View>
          </View>
        </SpiritualCard>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('availableStudies')}
          </Text>

          {familyStudies.map((study) => (
            <SpiritualCard
              key={study.id}
              style={[
                styles.studyCard,
                !study.isUnlocked && styles.studyCardLocked
              ]}
              onPress={() => openStudy(study)}
            >
              <View style={styles.studyHeader}>
                <View style={styles.studyIcon}>
                  {!study.isUnlocked ? (
                    <Lock size={24} color={Colors.muted} />
                  ) : study.isCompleted ? (
                    <CheckCircle size={24} color={Colors.success} />
                  ) : (
                    <BookOpen size={24} color={Colors.softGold} />
                  )}
                </View>

                <View style={styles.studyInfo}>
                  <Text style={[
                    styles.studyTitle,
                    { fontFamily: getFontFamily('SemiBold') },
                    !study.isUnlocked && styles.studyTitleLocked
                  ]}>
                    {study.title}
                  </Text>
                  <Text style={[
                    styles.studyDescription,
                    { fontFamily: getFontFamily('Regular') },
                    !study.isUnlocked && styles.studyDescriptionLocked
                  ]}>
                    {study.description}
                  </Text>
                  <View style={styles.studyMeta}>
                    <Text style={[
                      styles.studyChapters,
                      { fontFamily: getFontFamily('Regular') },
                      !study.isUnlocked && styles.studyChaptersLocked
                    ]}>
                      {study.chapters} {t('chapters')}
                    </Text>
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(study.difficulty) },
                      !study.isUnlocked && styles.difficultyBadgeLocked
                    ]}>
                      <Text style={[styles.difficultyText, { fontFamily: getFontFamily('Medium') }]}>
                        {getDifficultyText(study.difficulty)}
                      </Text>
                    </View>
                  </View>

                  {study.isUnlocked && study.progress > 0 && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View
                          style={[styles.progressFill, { width: `${study.progress}%` }]}
                        />
                      </View>
                      <Text style={[styles.progressText, { fontFamily: getFontFamily('Regular') }]}>
                        {Math.round(study.progress)}% {t('complete')}
                      </Text>
                    </View>
                  )}
                </View>

                {study.isCompleted && (
                  <Star size={20} color={Colors.softGold} fill={Colors.softGold} />
                )}
              </View>

              {!study.isUnlocked && (
                <View style={styles.lockedMessage}>
                  <Text style={[styles.lockedText, { fontFamily: getFontFamily('Regular') }]}>
                    {t('completeStudyToUnlock', { study: study.id - 1 })}
                  </Text>
                </View>
              )}
            </SpiritualCard>
          ))}
        </View>

        <SpiritualCard style={styles.recommendationCard}>
          <Text style={[styles.recommendationTitle, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('recommendedForYou')}
          </Text>
          <Text style={[styles.recommendationText, { fontFamily: getFontFamily('Regular') }]}>
            {t('recommendationText')}
          </Text>
          <TouchableOpacity
            style={styles.recommendationButton}
            onPress={() => {
              const nextStudy = familyStudies.find(s => s.isUnlocked && !s.isCompleted);
              if (nextStudy) {
                openStudy(nextStudy);
              }
            }}
          >
            <Text style={[styles.recommendationButtonText, { fontFamily: getFontFamily('SemiBold') }]}>
              {t('continueStudy')}
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
  studyCardLocked: {
    backgroundColor: Colors.softGray,
    borderColor: Colors.mediumGray,
  },
  studyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  studyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lightGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  studyInfo: {
    flex: 1,
  },
  studyTitle: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 4,
  },
  studyTitleLocked: {
    color: Colors.muted,
  },
  studyDescription: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 8,
    lineHeight: 18,
  },
  studyDescriptionLocked: {
    color: Colors.muted,
  },
  studyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  studyChapters: {
    fontSize: 12,
    color: Colors.secondary,
  },
  studyChaptersLocked: {
    color: Colors.muted,
  },
  difficultyBadge: {
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  difficultyBadgeLocked: {
    backgroundColor: Colors.mediumGray,
  },
  difficultyText: {
    fontSize: 10,
    color: Colors.warmWhite,
    textTransform: 'uppercase',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.lightGold,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.softGold,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: Colors.secondary,
  },
  lockedMessage: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGold,
  },
  lockedText: {
    fontSize: 12,
    color: Colors.muted,
    textAlign: 'center',
    fontStyle: 'italic',
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
