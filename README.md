# おにぎり屋さんダイス

仕入れと開店をまわす、おにぎり屋さんのためのサイコロ（PWA）です。

> [!NOTE]
> 本アプリは**非公式・非営利のファンメイドツール**です。個人での利用や既存のものの**代用品**として作られたものであり、特定の企業・団体・作品とは一切関係ありません。

## サイコロの面（6面）

| 出目 | 面数 |
| --- | --- |
| 仕入れ | 2面 |
| 仕入れ(+1枚) | 1面 |
| 仕入れ(-1枚) | 1面 |
| 開店 | 2面 |

「サイコロを振る」ボタンを押すと、3D のサイコロが回って結果を表示します。
スマホでの利用に最適化しています。

## ファイル構成

```
.
├── index.html            # 画面
├── styles.css            # 見た目
├── app.js                # サイコロの抽選・回転
├── sw.js                 # Service Worker（オフライン用の最小キャッシュ）
├── manifest.webmanifest  # PWA マニフェスト
├── icons/                # アプリアイコン（PNG / SVG 原本）
└── .nojekyll             # GitHub Pages 用
```

## ローカルで確認する

Service Worker と PWA の動作確認には `localhost` か HTTPS が必要です。

```sh
python3 -m http.server 8000
# → http://localhost:8000/ を開く
```

## GitHub Pages へ公開する

1. GitHub に空のリポジトリ（例: `onigiri-yasan-dice`）を作成します。
2. このフォルダを push します。

   ```sh
   git remote add origin git@github.com:<ユーザー名>/onigiri-yasan-dice.git
   git push -u origin main
   ```

3. リポジトリの **Settings → Pages** を開きます。
4. **Source** を `Deploy from a branch`、**Branch** を `main` / `/(root)` にして **Save**。
5. 数十秒後に `https://<ユーザー名>.github.io/onigiri-yasan-dice/` で公開されます。

すべて相対パスで書いているので、サブディレクトリ配信（`/onigiri-yasan-dice/`）でもそのまま動きます。

## スマホへのインストール

公開 URL をスマホで開き、ホーム画面に追加します。

- **iOS (Safari)**: 共有ボタン → 「ホーム画面に追加」
- **Android (Chrome)**: メニュー → 「アプリをインストール」/「ホーム画面に追加」

インストール後は全画面（standalone）で起動します。
