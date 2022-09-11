# Kiosk

[데모 사이트](http://3.35.55.102:3000)

태블릿용 키오스크
- 리액트 라우팅 구현
- 리액트 mount,unmount 애니메이션 구현 

## 클라이언트 실행 
```bash
cd client
yarn install 
yarn start
```

## 서버 실행
1. mysql 데이터 베이스와 연결할 수 있게 env 파일 작성 

환경에 따라 `development.env`와 `production.env`로 나누어주세요.

```bash
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_HOST=
PORT=
```

2. 데이터베이스에 목업 데이터를 넣어주고 싶은 경우 (option)

`migration` 브랜치로 이동
```bash
git checkout migration
```

`init.ts` 실행
```bash 
cd server/src/migration
npx ts-node init.ts
```
목업 데이터 실행 

3. 서버 실행 
```bash
# dev 실행
yarn start:dev 

# production 실행 
yarn start
```

## ERD


<p align="center">
  <img align="center" height="600" src="https://user-images.githubusercontent.com/78121870/188043111-e47d8023-f7c6-44f6-b36e-fdc943e8a210.png">
</p>

## 실행 화면 
- 리액트 mount,unmount 애니메이션 구현 
<p align="center">
 <img align="center"  height="600" src="https://user-images.githubusercontent.com/78121870/189512002-16585d55-cc34-4d0b-863c-5295489e6067.gif">
</p>


- 랜딩 페이지
<p align="center">
  <img align="center" height="600" src="https://user-images.githubusercontent.com/78121870/188042805-2499fea4-e618-4f30-8b1b-159005f41539.png">
</p>


- 메뉴 페이지 
<p align="center">
  <img align="center" height="600" src="https://user-images.githubusercontent.com/78121870/188043392-721bcf4a-0c1a-4a96-8dcc-961060a3a647.png">
</p>

- 상품 담기 
<p align="center">
  <img align="center" height="600" src="https://user-images.githubusercontent.com/78121870/188042892-d49e6c45-0818-4c8e-a4bf-016e5b072279.png">
</p>

- 결제 페이지 

<p align="center">
  <img align="center" height="600" src="https://user-images.githubusercontent.com/78121870/188042949-abf5cdd7-29a8-4979-a273-48022a02f02d.png">
</p>

<p align="center">
  <img align="center" height="600" src="https://user-images.githubusercontent.com/78121870/188042966-2bb27821-7bcd-49bf-81a7-ce80c7423de6.png">
</p>
