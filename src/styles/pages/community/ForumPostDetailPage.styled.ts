import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'src/components/common/Button';

export const PageHeader = styled.div`
  font-size: 0.85rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  a {
    text-decoration: none;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text}aa;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
    }
  }
`;

export const Breadcrumbs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.875rem;
`;

export const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text}aa;
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const BreadcrumbSeparator = styled.span`
  color: ${({ theme }) => theme.colors.text}aa;
`;

export const PostContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const Sidebar = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.spacing.xl};
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.xl};

  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`;

export const PostHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PostCategory = styled.div`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.primary}11;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const PostTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem; // 1.75rem에서 증가
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.3; // 줄 간격 추가
`;


export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text}aa;
  font-size: 0.875rem;
`;
export const PostAuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const AuthorAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary}22;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const AuthorName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

export const PostStatistics = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  `,
  Date: styled.span`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text}aa;
  `,
  Category: styled.span`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text}aa;
  `,
  Views: styled.span`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text}aa;
  `
};

export const PostContent = styled.div`
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.dark};
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const PostActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ActionButton = styled.button<{ isActive?: boolean; variant?: 'primary' | 'secondary' | 'tertiary' }>`
  width: 70px;  
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ isActive, variant, theme }) => 
  isActive ? `${theme.colors.primary}11` : 'transparent'};
  height: 30px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: none;
  color: ${({ isActive, variant, theme }) => {
    if (isActive) return theme.colors.primary;
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.secondary || theme.colors.text;
    if (variant === 'tertiary') return `${theme.colors.text}aa`;
    return theme.colors.text;
  }};
  font-weight: ${({ isActive, variant }) => (isActive || variant === 'primary') ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}11`};
    color: ${({ theme }) => theme.colors.primary};
  }
  &:focus {
    background-color: ${({ theme }) => `${theme.colors.primary}11`};
  }
`;


export const CommentsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CommentCount = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CommentForm = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  resize: vertical;
  box-sizing: border-box; // 패딩이 너비에 포함되도록 설정
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}22;
  }
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const CommentItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
`;

export const CommentDate = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}aa;
`;

export const CommentContent = styled.div`
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const CommentActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const RelatedTopics = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: 600;
  }
`;

export const TopicsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TopicItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} 0`};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TopicIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary}22;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`;

export const TopicText = styled.span`
  flex: 1;
`;

export const WidgetTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.dark};
`;

export const WidgetContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.6;
  }
`;

export const WidgetButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.md};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}11;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};

  } 
  
`;