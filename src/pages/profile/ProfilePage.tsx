import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useAuth } from "../../context/AuthContext";
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  ProfileContainer,
  SectionHeader,
  ProfileSection,
  ProfileGrid,
  ProfileCard,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  ProgressContainer,
  ProgressHeader,
  ProgressTitle,
  ProgressValue,
  ProgressBar,
  ProgressFill,
  FormGroup,
  FormRow,
} from "../../styles/pages/profile/ProfilePage.styled";

// 기본 목표 데이터 (실제로는 사용자별로 다를 수 있음)
const defaultGoals = [
  {
    id: 1,
    name: "비상금 마련",
    progress: 75,
    target: 10000000,
    current: 7500000,
  },
  {
    id: 2,
    name: "부채 상환",
    progress: 50,
    target: 25000000,
    current: 12500000,
  },
  {
    id: 3,
    name: "주택 구입 자금",
    progress: 30,
    target: 100000000,
    current: 30000000,
  },
];

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, isLoading, updateUserProfile } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [isUpdating, setIsUpdating] = useState(false);

  // 사용자 정보가 로드되면 이름 업데이트
  React.useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      const success = await updateUserProfile({ name });
      if (success) {
        setIsEditMode(false);
      } else {
        alert("프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setName(user?.name || "");
  };

  // 로딩 중이거나 인증되지 않은 경우
  if (isLoading) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "50px" }}>
          로딩 중...
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>로그인이 필요합니다</h2>
          <p>프로필을 보려면 먼저 로그인해주세요.</p>
        </div>
      </Layout>
    );
  }

  // 사용자별 데이터 (실제로는 데이터베이스에서 가져와야 함)
  const userData = {
    joinDate: "2023년 3월 15일", // 실제로는 사용자 생성 날짜를 사용해야 함
    completedModules: 5,
    totalModules: 12,
    profileCompletion: 80,
    financialHealth: 65,
    goals: defaultGoals,
  };

  return (
    <Layout>
      <PageHeader>
        <PageTitle>내 프로필</PageTitle>
        <PageSubtitle>
          개인 정보 및 재정 상태를 관리하고 목표 달성 과정을 확인하세요.
        </PageSubtitle>
      </PageHeader>

      <ProfileContainer>
        <ProfileCard variant="elevated">
          <ProfileHeader>
            <ProfileAvatar>
              {/* 실제 이미지가 있다면 이미지를 사용, 없으면 이니셜 표시 */}
              {user.avatar ? (
                <img src={user.avatar} alt="프로필 이미지" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
              ) : (
                user.name.charAt(0)
              )}
            </ProfileAvatar>

            <ProfileInfo>
              {isEditMode ? (
                <FormGroup>
                  <Input
                    label="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              ) : (
                <>
                  <ProfileName>{user.name}</ProfileName>
                  <ProfileEmail>{user.email}</ProfileEmail>
                  <Button variant="primary" onClick={() => setIsEditMode(true)}>
                    프로필 편집
                  </Button>
                </>
              )}
            </ProfileInfo>
          </ProfileHeader>

          {isEditMode ? (
            <div>
              <FormRow>
                <Input
                  label="이메일"
                  type="email"
                  value={user.email}
                  disabled
                  isFullWidth
                />
              </FormRow>

              <FormRow>
                <Button 
                  variant="primary" 
                  onClick={handleSaveProfile}
                  disabled={isUpdating}
                >
                  {isUpdating ? "저장 중..." : "저장하기"}
                </Button>
                <Button
                  variant="light"
                  onClick={handleCancelEdit}
                  disabled={isUpdating}
                >
                  취소
                </Button>
              </FormRow>
            </div>
          ) : (
            <div>
              <ProgressContainer>
                <ProgressHeader>
                  <ProgressTitle>프로필 완성도</ProgressTitle>
                  <ProgressValue>
                    {userData.profileCompletion}%
                  </ProgressValue>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill
                    width={userData.profileCompletion}
                    color="#3366FF"
                  />
                </ProgressBar>
              </ProgressContainer>

              <ProgressContainer>
                <ProgressHeader>
                  <ProgressTitle>재정 건강도</ProgressTitle>
                  <ProgressValue>{userData.financialHealth}%</ProgressValue>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill
                    width={userData.financialHealth}
                    color={
                      userData.financialHealth > 70
                        ? "#00C853"
                        : userData.financialHealth > 40
                        ? "#FFD600"
                        : "#F44336"
                    }
                  />
                </ProgressBar>
              </ProgressContainer>

              <ProgressContainer>
                <ProgressHeader>
                  <ProgressTitle>학습 진행도</ProgressTitle>
                  <ProgressValue>
                    {userData.completedModules}/{userData.totalModules}{" "}
                    모듈
                  </ProgressValue>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill
                    width={
                      (userData.completedModules /
                        userData.totalModules) *
                      100
                    }
                    color="#6C63FF"
                  />
                </ProgressBar>
              </ProgressContainer>
            </div>
          )}
        </ProfileCard>

        <ProfileSection>
          <SectionHeader>재정 목표</SectionHeader>
          <ProfileGrid>
            {userData.goals.map((goal) => (
              <ProfileCard key={goal.id} variant="outlined">
                <ProgressTitle>{goal.name}</ProgressTitle>
                <ProgressContainer>
                  <ProgressHeader>
                    <ProgressValue>{goal.progress}%</ProgressValue>
                    <ProgressValue>
                      {goal.current.toLocaleString()}원 /{" "}
                      {goal.target.toLocaleString()}원
                    </ProgressValue>
                  </ProgressHeader>
                  <ProgressBar>
                    <ProgressFill width={goal.progress} color="#3366FF" />
                  </ProgressBar>
                </ProgressContainer>
                <Button variant="primary" size="sm">
                  목표 수정
                </Button>
              </ProfileCard>
            ))}
            <ProfileCard variant="outlined">
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <Button variant="primary">새 목표 추가</Button>
              </div>
            </ProfileCard>
          </ProfileGrid>
        </ProfileSection>

        <ProfileSection>
          <SectionHeader>추천 학습 모듈</SectionHeader>
          <ProfileGrid>
            <ProfileCard variant="outlined">
              <h3>예산 관리의 기본</h3>
              <p>
                효과적인 예산 계획을 세우고 지출을 관리하는 방법을 배우세요.
              </p>
              <Button variant="primary" size="sm">
                학습 시작
              </Button>
            </ProfileCard>
            <ProfileCard variant="outlined">
              <h3>투자 포트폴리오 구성</h3>
              <p>리스크 분산과 장기적 성장을 위한 투자 포트폴리오 구성 전략</p>
              <Button variant="primary" size="sm">
                학습 시작
              </Button>
            </ProfileCard>
          </ProfileGrid>
        </ProfileSection>
      </ProfileContainer>
    </Layout>
  );
};

export default ProfilePage;
