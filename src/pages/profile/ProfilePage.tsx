import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
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
  ProgressContainer,
  ProgressHeader,
  ProgressTitle,
  ProgressValue,
  ProgressBar,
  ProgressFill,
  FormGroup,
  ProfileImage,
  AvatarOverlay,
  AvatarIcon,
  ButtonGroup,
  FileInput,
  ProfileInfoRow,
  ProfileInfoLabel,
  ProfileInfoValue
} from '../../styles/pages/profile/ProfilePage.styled';

// 사용자 프로필 데이터 (임시)
const profileData = {
  joinDate: '2023년 3월 15일',
  completedModules: 5,
  totalModules: 12,
  profileCompletion: 80,
  financialHealth: 65,
  goals: [
    { id: 1, name: '비상금 마련', progress: 75, target: 10000000, current: 7500000 },
    { id: 2, name: '부채 상환', progress: 50, target: 25000000, current: 12500000 },
    { id: 3, name: '주택 구입 자금', progress: 30, target: 100000000, current: 30000000 }
  ]
};

const ProfilePage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 사용자 정보가 로드되면 상태 업데이트
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar);
      setIsLoading(false);
    } else if (!isLoading) {
      // 사용자가 로그인하지 않은 경우 로그인 페이지로 리디렉션
      navigate('/login');
    }
  }, [user, isAuthenticated, navigate, isLoading]);

  const handleAvatarClick = () => {
    if (isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // 미리보기 URL 생성
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);
    }
  };

  const handleSubmit = async () => {
    setUpdateLoading(true);
    try {
      const success = await updateUserProfile({
        name,
        avatar: avatarFile || undefined
      });
      
      if (success) {
        // 업데이트 성공 시 편집 모드 종료
        setIsEditMode(false);
        setAvatarFile(null);
      } else {
        console.error('프로필 업데이트 실패');
      }
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setName(user?.name || '');
    setAvatarPreview(user?.avatar);
    setAvatarFile(null);
    
    // 미리보기 URL 해제
    if (avatarPreview && !user?.avatar) {
      URL.revokeObjectURL(avatarPreview);
    }
  };

  // 로딩 중이거나 사용자 정보가 없는 경우 로딩 표시
  if (isLoading || !user) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>로딩 중...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader>
        <PageTitle>내 프로필</PageTitle>
        <PageSubtitle>개인 정보 및 재정 상태를 관리하고 목표 달성 과정을 확인하세요.</PageSubtitle>
      </PageHeader>
      
      <ProfileContainer>
        <ProfileCard variant="elevated">
          <ProfileHeader>
            <ProfileAvatar onClick={handleAvatarClick}>
              {avatarPreview ? (
                <ProfileImage src={avatarPreview} alt="프로필 이미지" />
              ) : (
                name.charAt(0)
              )}
              
              {isEditMode && (
                <AvatarOverlay>
                  <AvatarIcon>📷</AvatarIcon>
                </AvatarOverlay>
              )}
              
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </ProfileAvatar>
            
            <ProfileInfo>
              {isEditMode ? (
                <>
                  <ProfileInfoRow>
                    <ProfileInfoLabel>이름</ProfileInfoLabel>
                    <FormGroup>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isFullWidth
                      />
                    </FormGroup>
                  </ProfileInfoRow>
                  
                  <ProfileInfoRow>
                    <ProfileInfoLabel>이메일</ProfileInfoLabel>
                    <FormGroup>
                      <Input
                        type="email"
                        value={email}
                        disabled
                        isFullWidth
                      />
                    </FormGroup>
                  </ProfileInfoRow>
                  
                  <ButtonGroup>
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      isLoading={updateLoading}
                    >
                      저장하기
                    </Button>
                    <Button
                      variant="light"
                      onClick={handleCancel}
                      disabled={updateLoading}
                    >
                      취소
                    </Button>
                  </ButtonGroup>
                </>
              ) : (
                <>
                  <ProfileName>{name}</ProfileName>
                  <ProfileInfoRow>
                    <ProfileInfoLabel>이메일</ProfileInfoLabel>
                    <ProfileInfoValue>{email}</ProfileInfoValue>
                  </ProfileInfoRow>
                  <ProfileInfoRow>
                    <ProfileInfoLabel>가입일</ProfileInfoLabel>
                    <ProfileInfoValue>{profileData.joinDate}</ProfileInfoValue>
                  </ProfileInfoRow>
                  <Button
                    variant="primary"
                    onClick={() => setIsEditMode(true)}
                    style={{ maxWidth:'300px'}}
                  >
                    프로필 편집
                  </Button>
                </>
              )}
            </ProfileInfo>
          </ProfileHeader>
          
          {!isEditMode && (
            <div>
              <ProgressContainer>
                <ProgressHeader>
                  <ProgressTitle>프로필 완성도</ProgressTitle>
                  <ProgressValue>{profileData.profileCompletion}%</ProgressValue>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill width={profileData.profileCompletion} color="#3366FF" />
                </ProgressBar>
              </ProgressContainer>
              
              <ProgressContainer>
                <ProgressHeader>
                  <ProgressTitle>재정 건강도</ProgressTitle>
                  <ProgressValue>{profileData.financialHealth}%</ProgressValue>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill 
                    width={profileData.financialHealth} 
                    color={profileData.financialHealth > 70 ? "#00C853" : 
                           profileData.financialHealth > 40 ? "#FFD600" : "#F44336"} 
                  />
                </ProgressBar>
              </ProgressContainer>
              
              <ProgressContainer>
                <ProgressHeader>
                  <ProgressTitle>학습 진행도</ProgressTitle>
                  <ProgressValue>{profileData.completedModules}/{profileData.totalModules} 모듈</ProgressValue>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill 
                    width={(profileData.completedModules / profileData.totalModules) * 100} 
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
            {profileData.goals.map(goal => (
              <ProfileCard key={goal.id} variant="outlined">
                <ProgressTitle>{goal.name}</ProgressTitle>
                <ProgressContainer>
                  <ProgressHeader>
                    <ProgressValue>{goal.progress}%</ProgressValue>
                    <ProgressValue>
                      {goal.current.toLocaleString()}원 / {goal.target.toLocaleString()}원
                    </ProgressValue>
                  </ProgressHeader>
                  <ProgressBar>
                    <ProgressFill width={goal.progress} color="#3366FF" />
                  </ProgressBar>
                </ProgressContainer>
                <Button variant="primary" size="sm">목표 수정</Button>
              </ProfileCard>
            ))}
            <ProfileCard variant="outlined">
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
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
              <p>효과적인 예산 계획을 세우고 지출을 관리하는 방법을 배우세요.</p>
              <Button variant="primary" size="sm">학습 시작</Button>
            </ProfileCard>
            <ProfileCard variant="outlined">
              <h3>투자 포트폴리오 구성</h3>
              <p>리스크 분산과 장기적 성장을 위한 투자 포트폴리오 구성 전략</p>
              <Button variant="primary" size="sm">학습 시작</Button>
            </ProfileCard>
          </ProfileGrid>
        </ProfileSection>
      </ProfileContainer>
    </Layout>
  );
};

export default ProfilePage; 