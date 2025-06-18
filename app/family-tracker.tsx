import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { SpiritualCard, ProgressRing } from '@/components/SpiritualCard';
import { ArrowLeft, Users, Plus, Calendar, Award, CheckCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function FamilyTrackerScreen() {
  const [selectedFamily, setSelectedFamily] = useState('Johnson Family');

  const familyMembers = [
    { id: 1, name: 'Sarah', progress: 85, completedStudies: 8, role: 'Parent' },
    { id: 2, name: 'Michael', progress: 72, completedStudies: 6, role: 'Parent' },
    { id: 3, name: 'Emma', progress: 60, completedStudies: 4, role: 'Teen' },
    { id: 4, name: 'Joshua', progress: 45, completedStudies: 3, role: 'Child' },
  ];

  const groupStudies = [
    {
      id: 1,
      title: "Family Devotions - Psalms",
      progress: 75,
      totalSessions: 12,
      completedSessions: 9,
      nextSession: "2024-01-16",
      participantsCount: 4,
      status: "active"
    },
    {
      id: 2,
      title: "The Parables Together",
      progress: 40,
      totalSessions: 10,
      completedSessions: 4,
      nextSession: "2024-01-18",
      participantsCount: 3,
      status: "active"
    },
    {
      id: 3,
      title: "Christmas Story Study",
      progress: 100,
      totalSessions: 6,
      completedSessions: 6,
      nextSession: null,
      participantsCount: 4,
      status: "completed"
    },
  ];

  const familyStats = {
    totalProgress: familyMembers.reduce((sum, member) => sum + member.progress, 0) / familyMembers.length,
    activeStudies: groupStudies.filter(study => study.status === 'active').length,
    completedGroup: groupStudies.filter(study => study.status === 'completed').length,
    weeklyGoal: 3,
    weeklyCompleted: 2,
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
            <Text style={styles.title}>Family Study Tracker</Text>
            <Text style={styles.subtitle}>Track your family's spiritual journey together</Text>
          </View>
        </View>

        {/* Family Overview */}
        <SpiritualCard style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <View style={styles.familyInfo}>
              <Text style={styles.familyName}>{selectedFamily}</Text>
              <Text style={styles.memberCount}>{familyMembers.length} members</Text>
            </View>
            <ProgressRing progress={familyStats.totalProgress} size={70} />
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{familyStats.activeStudies}</Text>
              <Text style={styles.statLabel}>Active Studies</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{familyStats.completedGroup}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{familyStats.weeklyCompleted}/{familyStats.weeklyGoal}</Text>
              <Text style={styles.statLabel}>Weekly Goal</Text>
            </View>
          </View>
        </SpiritualCard>

        {/* Family Members Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Members</Text>
          
          {familyMembers.map((member) => (
            <SpiritualCard key={member.id} style={styles.memberCard}>
              <View style={styles.memberHeader}>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
                <ProgressRing progress={member.progress} size={50} />
              </View>
              <View style={styles.memberStats}>
                <Text style={styles.memberStudies}>
                  {member.completedStudies} studies completed
                </Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${member.progress}%` }
                    ]} 
                  />
                </View>
              </View>
            </SpiritualCard>
          ))}
        </View>

        {/* Group Studies */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Group Studies</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color={Colors.softGold} />
            </TouchableOpacity>
          </View>
          
          {groupStudies.map((study) => (
            <SpiritualCard key={study.id} style={styles.studyCard}>
              <View style={styles.studyHeader}>
                <View style={styles.studyInfo}>
                  <Text style={styles.studyTitle}>{study.title}</Text>
                  <View style={styles.studyMeta}>
                    <Users size={14} color={Colors.muted} />
                    <Text style={styles.studyParticipants}>
                      {study.participantsCount} participants
                    </Text>
                    {study.status === 'completed' && (
                      <CheckCircle size={14} color={Colors.success} />
                    )}
                  </View>
                </View>
                <View style={styles.studyProgress}>
                  <Text style={styles.progressPercentage}>{study.progress}%</Text>
                </View>
              </View>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${study.progress}%` }
                  ]} 
                />
              </View>
              
              <View style={styles.studyFooter}>
                <Text style={styles.studySessions}>
                  {study.completedSessions}/{study.totalSessions} sessions
                </Text>
                {study.nextSession && (
                  <View style={styles.nextSession}>
                    <Calendar size={12} color={Colors.muted} />
                    <Text style={styles.nextSessionText}>
                      Next: {new Date(study.nextSession).toLocaleDateString()}
                    </Text>
                  </View>
                )}
              </View>
            </SpiritualCard>
          ))}
        </View>

        {/* Weekly Challenge */}
        <SpiritualCard style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Award size={20} color={Colors.softGold} />
            <Text style={styles.challengeTitle}>Weekly Family Challenge</Text>
          </View>
          <Text style={styles.challengeDescription}>
            Complete 3 family devotion sessions this week. You're currently at 
            {familyStats.weeklyCompleted} out of {familyStats.weeklyGoal}!
          </Text>
          <View style={styles.challengeProgress}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(familyStats.weeklyCompleted / familyStats.weeklyGoal) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.challengeProgressText}>
              {Math.round((familyStats.weeklyCompleted / familyStats.weeklyGoal) * 100)}%
            </Text>
          </View>
        </SpiritualCard>

        {/* Start New Study Button */}
        <TouchableOpacity style={styles.newStudyButton}>
          <Plus size={20} color={Colors.warmWhite} />
          <Text style={styles.newStudyButtonText}>Start New Family Study</Text>
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
    fontFamily: 'Crimson-SemiBold',
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.secondary,
  },
  overviewCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 24,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  familyInfo: {},
  familyName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 4,
  },
  memberCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.secondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.softGold,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.secondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: Colors.primary,
  },
  addButton: {
    backgroundColor: Colors.lightGold,
    borderRadius: 20,
    padding: 8,
  },
  memberCard: {
    marginBottom: 12,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberInfo: {},
  memberName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 2,
  },
  memberRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.secondary,
  },
  memberStats: {},
  memberStudies: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.lightGold,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.softGold,
    borderRadius: 3,
  },
  studyCard: {
    marginBottom: 12,
  },
  studyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  studyInfo: {
    flex: 1,
    marginRight: 12,
  },
  studyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 6,
  },
  studyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studyParticipants: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.muted,
    marginLeft: 6,
    marginRight: 12,
  },
  studyProgress: {
    alignItems: 'center',
  },
  progressPercentage: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.softGold,
  },
  studyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  studySessions: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.secondary,
  },
  nextSession: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextSessionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: Colors.muted,
    marginLeft: 4,
  },
  challengeCard: {
    backgroundColor: Colors.lightGold,
    marginBottom: 20,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 8,
  },
  challengeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeProgressText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.softGold,
    marginLeft: 12,
  },
  newStudyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.softGold,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },
  newStudyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.warmWhite,
    marginLeft: 8,
  },
});