# EduQuiz

Ứng dụng học tập và thi trắc nghiệm trên mobile, xây dựng bằng **Expo + React Native + TypeScript**.

---

## Yêu cầu hệ thống

| Công cụ | Phiên bản tối thiểu | Ghi chú |
|---|---|---|
| Node.js | 18.x trở lên | Khuyến nghị LTS |
| npm | 9.x trở lên | Đi kèm Node.js |
| Expo CLI | Tự động qua `npx` | Không cần cài global |
| Git | Bất kỳ | Để clone repo |
| Expo Go (app) | Mới nhất | Cài trên điện thoại để test |

> **iOS:** Cần macOS + Xcode 15+ để build native. Dùng Expo Go để test nhanh không cần build.  
> **Android:** Cần Android Studio + JDK 17 để build native. Dùng Expo Go để test nhanh.

---

## Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/<your-username>/eduquiz-rn.git
cd eduquiz-rn
```

### 2. Cài dependencies

```bash
npm install
```

> Không dùng `yarn` hoặc `pnpm` — project dùng `package-lock.json`.

---

## Chạy ứng dụng

### Khởi động development server

```bash
npm start
```

Sau khi server khởi động, terminal hiển thị QR code. Chọn nền tảng:

| Phím | Hành động |
|---|---|
| `a` | Mở Android emulator |
| `i` | Mở iOS simulator (macOS only) |
| `w` | Mở trình duyệt web |
| `r` | Reload app |
| `m` | Bật/tắt menu developer |

### Chạy trực tiếp theo nền tảng

```bash
# Android emulator / thiết bị thật
npm run android

# iOS simulator (macOS only)
npm run ios

# Trình duyệt web
npm run web
```

### Test trên điện thoại thật (Expo Go)

1. Cài **Expo Go** từ App Store hoặc Google Play
2. Chạy `npm start`
3. Quét QR code bằng:
   - **iOS:** Camera app
   - **Android:** App Expo Go

---

## Cấu trúc project

```
eduquiz-rn/
├── app/                  # Screens (Expo Router file-based routing)
│   ├── _layout.tsx       # Root layout
│   ├── (auth)/           # Màn hình xác thực
│   ├── (tabs)/           # Tab chính (Home, Explore, Leaderboard, Profile)
│   ├── quiz/             # Luồng làm bài
│   ├── create/           # Tạo quiz
│   ├── live-battle/      # Đấu trực tiếp
│   ├── classroom/        # Lớp học
│   ├── profile/          # Hồ sơ & thống kê
│   ├── leaderboard/      # Bảng xếp hạng mở rộng
│   └── search/           # Tìm kiếm
├── components/           # Shared components
│   ├── ui/               # Design system (Button, Card, Header...)
│   ├── quiz/             # Quiz-specific components
│   ├── leaderboard/      # Leaderboard components
│   └── navigation/       # BottomTabBar
├── constants/            # Colors, spacing, typography, routes
├── hooks/                # useTheme, useCountdown, useQuizPlay
├── store/                # QuizSessionStore (module singleton)
├── theme/                # Light & dark theme tokens
└── assets/               # Images, icons
```

---

## Đưa lên Git

### Lần đầu (khởi tạo repo mới)

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm remote
git remote add origin https://github.com/<your-username>/eduquiz-rn.git

# Stage tất cả file
git add .

# Commit đầu tiên
git commit -m "feat: initial project setup"

# Push lên branch main
git push -u origin main
```

### Cập nhật thay đổi (workflow thông thường)

```bash
# Xem trạng thái
git status

# Stage file đã thay đổi
git add .

# Hoặc stage từng file cụ thể
git add app/quiz/lobby.tsx components/ui/AppHeader.tsx

# Commit với message mô tả rõ
git commit -m "fix: sửa back button trên AppHeader"

# Push lên remote
git push
```

### Làm việc theo branch (khuyến nghị)

```bash
# Tạo branch mới cho feature/fix
git checkout -b feature/ten-tinh-nang

# Làm việc, commit như bình thường...
git add .
git commit -m "feat: thêm màn hình kết quả quiz"

# Push branch lên remote
git push -u origin feature/ten-tinh-nang

# Tạo Pull Request trên GitHub để merge vào main
```

---

## Những file KHÔNG đưa lên Git

File `.gitignore` đã cấu hình sẵn để loại trừ:

```
node_modules/     # Dependencies — cài lại bằng npm install
.expo/            # Cache Expo local
dist/             # Build output
*.env.local       # Biến môi trường nhạy cảm
/ios              # Native iOS (generate bằng expo prebuild)
/android          # Native Android (generate bằng expo prebuild)
*.jks *.p12 *.key # Keystore & certificates
.DS_Store         # macOS metadata
```

> **Quan trọng:** Không bao giờ commit file `.env` chứa API keys, secrets, hay credentials.

---

## Khi clone về máy mới

Sau khi clone, chỉ cần chạy:

```bash
npm install
npm start
```

Không cần thêm bước nào khác — project không có native code tùy chỉnh, chạy hoàn toàn qua Expo Go.

---

## Troubleshooting

### Lỗi `npm install` thất bại

```bash
# Xóa cache và cài lại
rm -rf node_modules
npm cache clean --force
npm install
```

### Metro bundler bị treo / lỗi cache

```bash
# Xóa cache Metro
npm start -- --clear
```

### Expo Go báo "Something went wrong"

```bash
# Restart server và xóa cache
npm start -- --clear
```

### Lỗi font không load

Fonts được load tự động trong `app/_layout.tsx` qua `useFonts`. Đảm bảo có kết nối internet lần đầu chạy để Expo tải font về.

### Lỗi `reanimated` worklets

Project đã cấu hình đúng trong `babel.config.js` — **không thêm** `react-native-reanimated/plugin` thủ công vào babel config, Expo SDK 52 tự xử lý.

---

## Thông tin project

| Thuộc tính | Giá trị |
|---|---|
| App name | EduQuiz |
| Bundle ID (iOS) | `com.eduquiz.app` |
| Package (Android) | `com.eduquiz.app` |
| Expo SDK | 52 |
| React Native | 0.76.9 |
| New Architecture | Bật (`newArchEnabled: true`) |
| Orientation | Portrait only |
