import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
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
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;

export const MainContent = styled.div`
  flex: 1;
`;

export const Sidebar = styled.div`
  width: 300px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
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
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
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
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  white-space: pre-line;
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ActionButton = styled.button<{ $isActive?: boolean; variant?: 'primary' | 'secondary' | 'tertiary' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: transparent;
  border: none;
  color: ${({ $isActive, variant, theme }) => {
    if ($isActive) return theme.colors.primary;
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.secondary || theme.colors.text;
    if (variant === 'tertiary') return `${theme.colors.text}aa`;
    return theme.colors.text;
  }};
  font-weight: ${({ $isActive, variant }) => ($isActive || variant === 'primary') ? '500' : '400'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CommentsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const CommentCount = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CommentForm = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  resize: vertical;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CommentItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
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
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RelatedTopics = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TopicsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
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
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.dark};
`;

export const WidgetContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: 1.6;
  }
`;