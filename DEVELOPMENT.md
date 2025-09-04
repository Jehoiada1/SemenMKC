# SemenMKC Development Guide

This guide provides detailed instructions for setting up and developing the SemenMKC Bible Study mobile application.

---

## 🛠️ Development Environment Setup

### System Requirements
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher  
- **Expo CLI**: Latest version
- **Git**: Latest version
- **IDE**: VS Code (recommended) with React Native extensions

### Platform-Specific Requirements

#### iOS Development (macOS only)
- **Xcode**: Latest version from App Store
- **iOS Simulator**: Installed with Xcode
- **CocoaPods**: `sudo gem install cocoapods`

#### Android Development
- **Android Studio**: Latest version
- **Android SDK**: API Level 31+
- **Java**: JDK 11 or higher
- **Android Emulator**: Set up through Android Studio

---

## 🚀 Project Setup

### 1. Repository Setup
```bash
# Clone the repository
git clone https://github.com/Jehoiada1/SemenMKC.git
cd SemenMKC

# Install dependencies
npm install

# Verify installation
npx expo --version
```

### 2. Environment Configuration

#### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Copy environment template:
   ```bash
   cp .env.template .env
   ```
4. Update `.env` with your credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

#### Database Setup
1. Run the migration in your Supabase dashboard:
   ```sql
   -- Copy and paste content from supabase/migrations/20250627064140_peaceful_jungle.sql
   ```
2. Verify tables are created: `studies`, `chapters`, `user_study_progress`
3. Check Row Level Security is enabled

### 3. Development Server
```bash
# Start Expo development server
npm run dev

# Alternative commands
npx expo start
npx expo start --ios     # iOS only
npx expo start --android # Android only
npx expo start --web     # Web only
```

---

## 📁 Project Structure Explained

```
SemenMKC/
├── app/                     # Main application screens
│   ├── (tabs)/             # Tab navigation screens
│   │   ├── index.tsx       # Home screen
│   │   ├── bible-study.tsx # Bible study list
│   │   ├── sermons.tsx     # Sermons list
│   │   └── profile.tsx     # User profile
│   ├── study/              # Study detail screens
│   │   └── [studyId]/      # Dynamic study routes
│   ├── _layout.tsx         # Root layout
│   └── +not-found.tsx      # 404 page
├── components/             # Reusable UI components
│   ├── LanguageToggle.tsx  # Language switcher
│   └── SpiritualCard.tsx   # Custom card component
├── constants/              # App constants
│   └── Colors.ts           # Color palette
├── contexts/               # React contexts
│   └── LanguageContext.tsx # i18n context
├── hooks/                  # Custom React hooks
│   └── useFrameworkReady.ts
├── utils/                  # Utility functions
│   ├── fonts.ts           # Font utilities
│   └── supabase.ts        # Supabase client
├── supabase/              # Database schema
│   └── migrations/        # Database migrations
├── assets/                # Static assets
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── app.json              # Expo configuration
└── .env                  # Environment variables
```

---

## 🔧 Development Workflow

### 1. Feature Development Process
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test locally
npm run dev

# Commit changes
git add .
git commit -m "feat: your feature description"

# Push and create PR
git push origin feature/your-feature-name
```

### 2. Code Quality Checks
```bash
# Lint code
npm run lint

# Type checking
npx tsc --noEmit

# Format code (if prettier is set up)
npx prettier --write .
```

### 3. Testing
```bash
# Currently no tests - TODO: Add testing framework
# Planned: Jest + React Native Testing Library
```

---

## 🛠️ Common Development Tasks

### Adding a New Screen
1. Create screen file in appropriate `app/` subdirectory
2. Follow existing naming conventions
3. Add navigation in `_layout.tsx` if needed
4. Add translations to `LanguageContext.tsx`
5. Create any needed components in `components/`

### Adding New Translations
1. Open `contexts/LanguageContext.tsx`
2. Add keys to both `en` and `am` objects
3. Use in components: `const { t } = useLanguage(); t('your.key')`

### Database Changes
1. Create new migration file in `supabase/migrations/`
2. Follow naming convention: `YYYYMMDDHHMMSS_description.sql`
3. Update TypeScript interfaces in `utils/supabase.ts`
4. Test migration in Supabase dashboard

### Adding UI Components
1. Create component in `components/` directory
2. Use TypeScript interfaces for props
3. Follow existing styling patterns from `Colors.ts`
4. Make component reusable and responsive

---

## 🐛 Troubleshooting

### Common Issues

#### "Cannot connect to Metro server"
```bash
# Clear cache and restart
npx expo start --clear
```

#### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Supabase connection issues
1. Verify `.env` file exists and has correct values
2. Check Supabase project is active
3. Verify network connectivity
4. Check Supabase dashboard for errors

#### TypeScript errors
```bash
# Check TypeScript compilation
npx tsc --noEmit
```

#### iOS build issues
```bash
# Clean iOS cache
npx expo run:ios --clear-cache
```

#### Android build issues
```bash
# Clean Android cache
npx expo run:android --clear-cache
```

### Getting Help
- Check [Expo documentation](https://docs.expo.dev/)
- Review [React Native documentation](https://reactnative.dev/)
- Check [Supabase documentation](https://supabase.com/docs)
- Search existing GitHub issues
- Create new issue with detailed description

---

## 📦 Dependencies Explained

### Core Framework
- **expo**: React Native framework and tooling
- **react-native**: Mobile app framework  
- **expo-router**: File-based navigation

### UI & Styling
- **react-native-safe-area-context**: Safe area handling
- **expo-linear-gradient**: Gradient components
- **lucide-react-native**: Icon library
- **expo-font**: Custom font loading

### Data & State
- **@supabase/supabase-js**: Backend client
- **@react-native-async-storage/async-storage**: Local storage
- **react**: React library with hooks

### Development
- **typescript**: Type safety
- **@types/react**: React type definitions
- **eslint**: Code linting

---

## 🚀 Deployment

### Development Build
```bash
# Create development build
npx expo build

# Install on device
npx expo install --device
```

### Production Build
```bash
# Configure app.json for production
# Update version, bundle identifier, etc.

# Build for iOS
npx expo build:ios

# Build for Android  
npx expo build:android
```

### Environment-Specific Builds
- **Development**: Uses `.env` with dev Supabase
- **Staging**: Uses staging Supabase instance
- **Production**: Uses production Supabase with encryption

---

## 📈 Performance Optimization

### Bundle Size
- Use `expo-font` preloading
- Optimize image assets
- Use lazy loading for heavy components
- Consider bundle splitting for large features

### Runtime Performance
- Implement virtualized lists for large datasets
- Use React.memo for expensive components
- Optimize re-renders with useCallback/useMemo
- Monitor with Flipper or React DevTools

### Database Performance
- Use proper indexing in Supabase
- Implement pagination for large datasets
- Cache frequently accessed data
- Use real-time subscriptions wisely

---

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` to git
- Use different keys for dev/staging/production
- Rotate keys regularly

### Database Security
- Row Level Security is enabled
- User can only access their own data
- Admin functions require proper authentication
- Validate all inputs on backend

### Mobile Security
- Use secure storage for sensitive data
- Implement certificate pinning for production
- Validate all user inputs
- Use proper authentication flows

---

## 📋 Next Development Priorities

### Phase 1: Backend Integration
- [ ] Set up authentication screens
- [ ] Connect to Supabase database
- [ ] Implement user registration/login
- [ ] Add real data loading

### Phase 2: Core Features
- [ ] Chapter content implementation
- [ ] Progress tracking persistence
- [ ] Sermon playback functionality
- [ ] Search and filtering

### Phase 3: Advanced Features
- [ ] Push notifications
- [ ] Offline mode
- [ ] Content management system
- [ ] Analytics integration

---

## 🤝 Contributing

### Code Standards
- Use TypeScript for all new code
- Follow existing naming conventions
- Add comments for complex logic
- Ensure mobile accessibility
- Test on both iOS and Android

### Pull Request Process
1. Create feature branch from main
2. Implement feature with tests
3. Update documentation if needed
4. Submit PR with clear description
5. Address review feedback
6. Merge after approval

### Commit Message Format
```
type(scope): description

Examples:
feat(auth): add login screen
fix(bible-study): resolve progress tracking bug
docs(readme): update setup instructions
```

---

This development guide should be updated as the project evolves. Keep it current with new processes, tools, and requirements.