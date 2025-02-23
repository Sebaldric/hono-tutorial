## Base URL

https://hono.template-beachovin-meta.workers.dev/

## API エンドポイント

### ブログ投稿

#### 全ての投稿を取得

- `GET /blog`
- レスポンス: `{ posts: BlogPost[] }`

#### 特定の投稿を取得

- `GET /blog/:id`
- レスポンス: `{ post: BlogPost }` または 404 エラー

#### 新規投稿を作成

- `POST /posts`
- ボディ:
  json
  {
  "title": "投稿タイトル",
  "content": "投稿内容",
  "author": "著者名"
  }

- レスポンス: `{ post: BlogPost }` (201 Created)

#### 投稿を更新

- `PUT /posts/:id`
- ボディ:
  json
  {
  "title": "更新タイトル",
  "content": "更新内容",
  "author": "更新著者名"
  }

- レスポンス: `{ post: BlogPost }` または 404 エラー

#### 投稿を削除

- `DELETE /posts/:id`
- レスポンス: `{ message: "Blog post deleted" }` または 404 エラー

### 認証エンドポイント

- `GET /auth/page`
- Basic 認証必須
  - ユーザー名: `hono`
  - パスワード: `acoolproject`
- レスポンス: "Hello Hono!"

## データ構造

### BlogPost

{
　　 id: number;
　　 title: string;
　　 content: string;
　　 author: string;
　　 createdAt: string;
　　 updatedAt: string;
}
