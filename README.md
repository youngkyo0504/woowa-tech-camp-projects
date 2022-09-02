<div align="center">
  <a href="https://github.com/woowa-techcamp-2022/web-moneybook-09">
    <img width="820" src="https://user-images.githubusercontent.com/78121870/182010905-284cf433-a58f-439f-b70f-ff2052db2b85.png" alt="Logo">
  </a>

  <p align="center">
    수입과 지출을 관리하는  웹용 가계부
    <br />
    <a href="https://chrome-submarine-cd8.notion.site/ACCOUNT-BOOK-c9d5548b5c8746dfbd00168c7a3ee2b4">
      <strong>  
        Notion Docs
      </strong>
    </a>
    <br/>
    <a href="https://woowa2022-moneybook-team9.herokuapp.com/">
      <strong>  
        Deployments
      </strong>
    </a>
  </p>
</div>

<table align="center">
  <tr>
    <td>
      <a href="https://github.com/youngkyo0504">
        <img src="https://avatars.githubusercontent.com/youngkyo0504" width="100"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/pyo-sh">
        <img src="https://avatars.githubusercontent.com/pyo-sh" width="100"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/youngkyo0504">
        <strong>
          금교영
        </strong>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pyo-sh">
        <strong>
          표석훈
        </strong>
      </a>
    </td>
  </tr>
</table>

## Built With

### Back-End 개발

-   NodeJS 기반의 Express 사용
-   데이터 베이스로 MySQL 사용
-   Public 폴더를 통해 Front-End 파일 제공 (index.html)

### Front-End 개발

-   Babel을 통해 호환성 높은 코드 제공
-   Webpack을 통해 일관성 있는 개발 시도
-   webpack dev, webpack prod 환경을 나누어 개발 시도

<br />
<br />

### Prerequisites

nodeJS, npm 사용 가능한 상태에서 의존 라이브러리들을 받습니다.

```sh
npm install
```

### Run & Deploy

1. Express 서버에서 해당 환경 변수를 사용하며, dotenv를 통해 제공하고 있습니다.
   `rootDirectory`에 `.env` 파일을 생성하여 아래의 내용을 기입합니다.

    ```
    PORT = {Express 구동 Port}

    DB_HOST = {MySQL Host}
    DB_USER = {Database User}
    DB_PASSWORD = {MySQL User Password}
    DB_PORT = {MySQL Port}
    DB_NAME = {Database Name}

    NODE_ENV = {"production" || "development"}
    ```

2. 개발을 진행할 때는 dev server를 실행합니다.

    ```sh
    # server dev모드 시작
    npm run server:dev

    # client dev모드 시작
    npm run client:dev

    # 동시에 시작
    npm run dev
    ```

3. 서버에서 DataBase 연결 Log 들이 모두 완료되었다는 뜨면 성공입니다.

    ```
    PAYMENT_METHOD TABLE CHECK...
    PAYMENT_METHOD TABLE CHECKED!
    CATEGORY TABLE CHECK...
    CATEGORY TABLE CHECKED!
    HISTORY TABLE CHECK...
    HISTORY TABLE CHECKED!
    ALL TABLE CHECKED!
    ```

4. production모드를 진행할 때는 Express 서버에서 Front-End 화면의 index.html을 Public으로 제공해야합니다.
   webpack으로 `./server/public` 위치에 번들링을 먼저 해야합니다.

    ```sh
    # webpack production모드로 번들링
    npm run build

    # 서버 실행
    npm run server:start
    ```

5. 클라우드 환경에서 배포를 진행할 때는 다음과 같은 명령어를 사용합니다. (pm2설치 필요)

    ```sh
    npm run deploy
    ```

<br />
<br />

## UIs (현재까지 구현 된)

### 메인 화면

현재 DB에 저장되어 있는 목록들이 전부 불러와집니다.

<img width="1790" alt="image" src="https://user-images.githubusercontent.com/78121870/182017074-c18657e4-a489-4f85-b0f5-4bf62f8c2dbd.png">

-   모든 값이 입력되면 지출 수입 내역을 추가할 수 있습니다.
-   내역들을 클릭하면 수정할 수 있습니다.
-   상단의 체크박스로 지출, 수입을 필터링할 수 있습니다.

### 캘린더

<img width="1790" alt="image" src="https://user-images.githubusercontent.com/78121870/182017429-240edaa7-ad20-45db-9309-498d9cffec5a.png">

-   날짜에 해당하는 가계부 내역의 날짜별 지출,수입 계산 및 전체 총액을 볼 수 있습니다.

<br/>

### 분석 페이지

<img width="1792" alt="image" src="https://user-images.githubusercontent.com/78121870/182017430-3cac9509-16ef-4e42-9cc5-56358edbd413.png">

-   가계부 지출 내역을 카테고리별로 볼 수 있습니다.
-   카테고리 별로 전체 지출 내역에 해당하는 비율을 볼 수 있습니다.
-   카테고리를 클릭하면 해당하는 최근 1년동안의 지출 내역을 보여주는 그래프와 각 상세정보를 볼 수 있습니다.

<img width="1792" alt="image" src="https://user-images.githubusercontent.com/78121870/182017562-5bc68521-c003-4584-9eb3-96ed372cfe7f.png">

## ETC

-   [프로젝트 위키](https://github.com/woowa-techcamp-2022/web-moneybook-09/wiki) (스크럼, 기능 분석)
