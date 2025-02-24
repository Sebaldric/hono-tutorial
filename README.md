## Base URL

https://hono.template-beachovin-meta.workers.dev/

## API エンドポイント

### TODO リスト

#### 全ての TODO を取得

- `GET /todos`
- レスポンス: `Todo[]`

#### 特定の TODO を取得

- `GET /todos/:id`
- レスポンス: `Todo` または `{ message: "Not found" }` (404)

#### 新規 TODO を作成

- `POST /todos`
- ボディ:

```json
{
  "title": "タイトル",
  "content": "内容",
  "author": "作成者"
}
```

- レスポンス: `Todo` (201 Created)

#### TODO を更新

- `PUT /todos/:id`
- ボディ:

```json
{
  "title": "更新タイトル",
  "content": "更新内容",
  "author": "更新者"
}
```

- レスポンス: `Todo` または `{ message: "Not found" }` (404)

#### TODO を削除

- `DELETE /todos/:id`
- レスポンス: `{ message: "Deleted" }` (200)

## データ構造

### Todo

```typescript
{
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
```

## バリデーション

リクエストボディは以下のバリデーションが適用されます：

- `title`: 1 文字以上の文字列
- `content`: 1 文字以上の文字列
- `author`: 1 文字以上の文字列
