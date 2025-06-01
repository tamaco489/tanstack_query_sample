.PHONY: mock-get-request mock-post-request \
        products-get cart-get cart-post \
        orders-get orders-post inventory-get inventory-patch

# 基本的なモックAPIのテスト
mock-get-request:
	curl -sX GET http://localhost:3000/api/mock | jq .

mock-post-request:
	curl -sX POST -H "Content-Type: application/json" -d '{"name": "テスト", "value": 123}' http://localhost:3000/api/mock | jq .

# 商品一覧
# GET /api/products - 商品一覧を取得（商品ID、名前、価格、在庫数などを含む）
products-get:
	curl -sX GET http://localhost:3000/api/products | jq .

# カート
# GET /api/cart - 現在のカートの内容を取得（商品リスト、小計、送料、税額、合計金額を含む）
cart-get:
	curl -sX GET http://localhost:3000/api/cart | jq .

# POST /api/cart - カートに商品を追加（商品ID、名前、価格、数量を指定）
cart-post:
	curl -sX POST -H "Content-Type: application/json" -d '{"productId": 3, "name": "スマートウォッチ", "price": 29800, "quantity": 1}' http://localhost:3000/api/cart | jq .

# 注文
# GET /api/orders - 注文履歴を取得（注文ID、日付、ステータス、商品リスト、合計金額、配送先情報を含む）
orders-get:
	curl -sX GET http://localhost:3000/api/orders | jq .

# POST /api/orders - 新規注文を作成（商品リストと配送先情報を指定）
orders-post:
	curl -sX POST -H "Content-Type: application/json" -d '{"items": [{"productId": 1, "name": "スマートフォン X", "price": 89800, "quantity": 1}], "shippingAddress": {"name": "山田 太郎", "postalCode": "123-4567", "address": "東京都渋谷区..."}}' http://localhost:3000/api/orders | jq .

# 在庫
# GET /api/inventory - 在庫情報を取得（商品ID、名前、現在の在庫数、予約在庫数、利用可能在庫数を含む）
inventory-get:
	curl -sX GET http://localhost:3000/api/inventory | jq .

# PATCH /api/inventory - 在庫数を更新（商品IDと減少させる数量を指定）
inventory-patch:
	curl -sX PATCH -H "Content-Type: application/json" -d '{"productId": 1, "quantity": 2}' http://localhost:3000/api/inventory | jq .
