import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { SpiritualCard } from '@/components/SpiritualCard';
import { ArrowLeft, BookOpen, Lock, CircleCheck as CheckCircle, Play } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedFont } from '@/utils/fonts';
import { supabase } from '@/utils/supabase';

interface Chapter {
  id: number;
  title: string;
  pages: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  progress: number;
}

interface Study {
  id: number;
  title: string;
  description: string;
  totalChapters: number;
  chapters: Chapter[];
}

export default function StudyDetailScreen() {
  const { studyId } = useLocalSearchParams();
  const { t } = useLanguage();
  const { getFontFamily, getTitleFont } = useLocalizedFont();
  
  const [study, setStudy] = useState<Study | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStudyData();
  }, [studyId]);

  const loadStudyData = async () => {
    try {
      // Mock data - in production this would come from Supabase
      const studyData: Study = {
        id: parseInt(studyId as string),
        title: 'Foundations of Faith',
        description: 'A comprehensive study exploring the fundamental principles of Christian faith, designed to strengthen your spiritual foundation.',
        totalChapters: 12,
        chapters: Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          title: `Chapter ${i + 1}: ${getChapterTitle(i + 1)}`,
          pages: 3,
          isCompleted: false,
          isUnlocked: i === 0, // Only first chapter unlocked initially
          progress: 0
        }))
      };

      // Load progress from Supabase
      const { data: progressData } = await supabase
        .from('user_study_progress')
        .select('*')
        .eq('study_id', studyId);

      if (progressData) {
        progressData.forEach(progress => {
          const chapterIndex = progress.chapter_id - 1;
          if (studyData.chapters[chapterIndex]) {
            studyData.chapters[chapterIndex].isCompleted = progress.is_chapter_complete;
            studyData.chapters[chapterIndex].progress = (progress.pages_completed / studyData.chapters[chapterIndex].pages) * 100;
            
            // Unlock next chapter if current is complete
            if (progress.is_chapter_complete && chapterIndex + 1 < studyData.chapters.length) {
              studyData.chapters[chapterIndex + 1].isUnlocked = true;
            }
          }
        });
      }

      setStudy(studyData);
      setIsLoading(false);
    } catch (error) {
      console.log('Error loading study data:', error);
      setIsLoading(false);
    }
  };

  const getChapterTitle = (chapterNumber: number): string => {
    const titles = [
      'Understanding God\'s Love',
      'The Nature of Faith',
      'Prayer and Communication',
      'Scripture and Truth',
      'Grace and Forgiveness',
      'Community and Fellowship',
      'Service and Ministry',
      'Spiritual Growth',
      'Overcoming Challenges',
      'Living with Purpose',
      'Sharing Your Faith',
      'Walking in Victory'
    ];
    return titles[chapterNumber - 1] || `Study Topic ${chapterNumber}`;
  };

  const openChapter = (chapter: Chapter) => {
    if (!chapter.isUnlocked) {
      return;
    }
    router.push(`/study/${studyId}/${chapter.id}/1`);
  };

  if (isLoading || !study) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { fontFamily: getFontFamily('Regular') }]}>
            {t('loading')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const completedChapters = study.chapters.filter(ch => ch.isCompleted).length;
  const overallProgress = (completedChapters / study.totalChapters) * 100;

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
              {study.title}
            </Text>
            <Text style={[styles.subtitle, { fontFamily: getFontFamily('Regular') }]}>
              {study.description}
            </Text>
          </View>
        </View>

        {/* Progress Overview */}
        <SpiritualCard style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { fontFamily: getFontFamily('SemiBold') }]}>
              {t('studyProgress')}
            </Text>
            <Text style={[styles.progressPercentage, { fontFamily: getFontFamily('Bold') }]}>
              {Math.round(overallProgress)}%
            </Text>
          </View>
          
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${overallProgress}%` }]} 
            />
          </View>
          
          <View style={styles.progressStats}>
            <Text style={[styles.progressText, { fontFamily: getFontFamily('Regular') }]}>
              {t('chaptersCompleted')}: {completedChapters} / {study.totalChapters}
            </Text>
          </View>
        </SpiritualCard>

        {/* Chapters List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: getFontFamily('SemiBold') }]}>
            {t('chapters')}
          </Text>
          
          {study.chapters.map((chapter) => (
            <SpiritualCard 
              key={chapter.id} 
              style={[
                styles.chapterCard,
                !chapter.isUnlocked && styles.chapterCardLocked
              ]}
              onPress={() => openChapter(chapter)}
            >
              <View style={styles.chapterHeader}>
                <View style={styles.chapterIcon}>
                  {!chapter.isUnlocked ? (
                    <Lock size={20} color={Colors.muted} />
                  ) : chapter.isCompleted ? (
                    <CheckCircle size={20} color={Colors.success} />
                  ) : (
                    <BookOpen size={20} color={Colors.softGold} />
                  )}
                </View>
                
                <View style={styles.chapterInfo}>
                  <Text style={[
                    styles.chapterTitle,
                    { fontFamily: getFontFamily('SemiBold') },
                    !chapter.isUnlocked && styles.chapterTitleLocked
                  ]}>
                    {chapter.title}
                  </Text>
                  <Text style={[
                    styles.chapterPages,
                    { fontFamily: getFontFamily('Regular') },
                    !chapter.isUnlocked && styles.chapterPagesLocked
                  ]}>
                    {chapter.pages} {t('pages')}
                  </Text>
                  
                  {chapter.isUnlocked && chapter.progress > 0 && (
                    <View style={styles.chapterProgressContainer}>
                      <View style={styles.chapterProgressBar}>
                        <View 
                          style={[
                            styles.chapterProgressFill, 
                            { width: `${chapter.progress}%` }
                          ]} 
                        />
                      </View>
                      <Text style={[styles.chapterProgressText, { fontFamily: getFontFamily('Regular') }]}>
                        {Math.round(chapter.progress)}%
                      </Text>
                    </View>
                  )}
                </View>
                
                {chapter.isUnlocked && (
                  <View style={styles.chapterAction}>
                    <Play size={16} color={Colors.softGold} />
                  </View>
                )}
              </View>
              
              {!chapter.isUnlocked && (
                <View style={styles.lockedMessage}>
                  <Text style={[styles.lockedText, { fontFamily: getFontFamily('Regular') }]}>
                    {t('completeChapterToUnlock', { chapter: chapter.id - 1 })}
                  </Text>
                </View>
              )}
            </SpiritualCard>
          ))}
        </View>

        {/* Study Completion */}
        {completedChapters === study.totalChapters && (
          <SpiritualCard style={styles.completionCard}>
            <View style={styles.completionHeader}>
              <CheckCircle size={32} color={Colors.success} />
              <Text style={[styles.completionTitle, { fontFamily: getFontFamily('Bold') }]}>
                {t('studyComplete')}
              </Text>
            </View>
            <Text style={[styles.completionText, { fontFamily: getFontFamily('Regular') }]}>
              {t('studyCompleteMessage')}
            </Text>
            <TouchableOpacity 
              style={styles.nextStudyButton}
              onPress={() => router.push('/bible-study')}
            >
              <Text style={[styles.nextStudyButtonText, { fontFamily: getFontFamily('SemiBold') }]}>
                {t('exploreMoreStudies')}
              </Text>
            </TouchableOpacity>
          </SpiritualCard>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  backButton: {
    marginRight: 16,
    marginTop: 4,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
  },
  progressCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    color: Colors.primary,
  },
  progressPercentage: {
    fontSize: 24,
    color: Colors.softGold,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.warmWhite,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.softGold,
    borderRadius: 4,
  },
  progressStats: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
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
  chapterCard: {
    marginBottom: 12,
  },
  chapterCardLocked: {
    backgroundColor: Colors.softGray,
    borderColor: Colors.mediumGray,
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 4,
  },
  chapterTitleLocked: {
    color: Colors.muted,
  },
  chapterPages: {
    fontSize: 12,
    color: Colors.secondary,
    marginBottom: 8,
  },
  chapterPagesLocked: {
    color: Colors.muted,
  },
  chapterProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.lightGold,
    borderRadius: 2,
    marginRight: 8,
  },
  chapterProgressFill: {
    height: '100%',
    backgroundColor: Colors.softGold,
    borderRadius: 2,
  },
  chapterProgressText: {
    fontSize: 10,
    color: Colors.secondary,
    minWidth: 30,
  },
  chapterAction: {
    padding: 8,
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
  completionCard: {
    backgroundColor: Colors.lightGold,
    alignItems: 'center',
    marginBottom: 20,
  },
  completionHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  completionTitle: {
    fontSize: 20,
    color: Colors.primary,
    marginTop: 8,
  },
  completionText: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  nextStudyButton: {
    backgroundColor: Colors.softGold,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  nextStudyButtonText: {
    fontSize: 14,
    color: Colors.warmWhite,
  },
});