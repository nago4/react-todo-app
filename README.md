# TodoApp

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「Todoアプリ」です。
機能としては次の通りです。
①タスクの追加を行うには「新しいタスクの追加」の欄から「名前」のところに入れたいタスク、優先度のところは優先したい順に大きい数字を選択します。「期限」の部分から締め切りの日時を選択します。設定ができたら追加ボタンを押し、タスクの追加は完了です。
②追加したタスクは、「締め切りでソート」ボタンと「完了済みのタスクを削除」の部分の間追加されていきます。タスクの名前の上の部分にチェックボックスがありますが、それにチェックを入れた状態で完了済みのタスクの削除を押すとチェックしていたタスクは削除されます。また、編集ボタンの横にある削除ボタンを押すとそのタスクができているかいないかにかかわらずそのタスクは削除されます。また、編集ボタンをクリックすると「新しいタスクの追加」のところにその編集を押したタスクの内容が入れられた状態で入り、編集を行うことができます。保存を押すことで変更内容を保存できます。ちなみに期限が過ぎた場合は期限の部分が赤色になります。（赤色にするかしないかの判断は1分毎で行っているのでもう時間過ぎてるのに赤くなってないことがあります。）
③「締め切りでソート」ボタンを押すと設定した締め切りでソートが行われます。ボタンを一度押すと、「締め切りでソート解除」ボタンを押すまでは新しくタスクを追加したらそれもソートされた状態で追加されます。
④「タスク追加フォームへ」を押すと「新しいタスクの追加」の欄まで移動します。

## 開発履歴

- 2024年10月24日：プロジェクト開始

## ライセンス

MIT License

Copyright (c) 2024 名古田真唯

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
