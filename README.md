# **🏅황금마켓🏅**

<br>

# 🙋‍♂️ **Members**

<table>
  <tr>
  <td align="center">
      <a href="https://github.com/happyGyu">
        <img src="https://avatars.githubusercontent.com/u/95538993?s=400&u=142c62a8238fbfd3a3e46976651dbc991cafc088&v=4" width="150px;" alt="황태규 사진"/><br />
        <sub><b>황태규</b><br></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/youngkyo0504">
        <img src="https://avatars.githubusercontent.com/u/78121870?v=4" width="150px;" alt="금교영 사진"/><br />
        <sub><b>금교영</b><br></sub>
      </a>
    </td>
  </tr>
</table>



## 기술 스택

### FE
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/reactquery-f59e0b?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">


### BE
<img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">


### INFRA
<img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white">

<!-- https://img.shields.io/badge/{배지이름}-{css컬러}?style={스타일}&logo={로고}&logoColor={로고컬러} -->

## HOW TO RUN

### Prerequisite
> 애플리케이션이 server(백엔드)와 client(프론트) 

- server 의존성 설치
```bash
# 의존성 설치
cd server
npm i 
```
- server env파일 
```bash
# TypeORM에 필요 
DATABASE_USER=<string>
DATABASE_PASSWORD=<string>
DATABASE_PORT=<number>
DATABASE_NAME=<string>
DATABASE_HOST=<string>

# 서버 포트
PORT=<number>

# OAUTH 연결에 필요
GITHUB_CLIENT_ID=<string>
GITHUB_CLIENT_SECRET=<string>

# 서버 로그인에 필요 
JWT_ACCESS_TOKEN_SECRET=<string>
JWT_ACCESS_TOKEN_EXPIRATION_TIME=<number>
JWT_REFRESH_TOKEN_EXPIRATION_TIME=<number>
JWT_REFRESH_TOKEN_SECRET=<string>

# aws s3연결 필요 (이미지 업로드)
AWS_S3_BUCKET_NAME=<string>
AWS_ACCESS_KEY_ID=<string>
AWS_SECRET_ACCESS_KEY=<string>
AWS_REGION=<string>
```

- client

``` bash
cd client
npm i
```

- client 환경변수 
```bash
REACT_APP_CLIENT_ID=<string>
REACT_APP_DEV_CLIENT_URL=<string>
REACT_APP_PROD_CLIENT_URL=<string>
REACT_APP_TOKEN_REFRESH_INTERVAL=<string>
REACT_APP_DEV_SERVER_URL=<string>
REACT_APP_PROD_SERVER_URL=<string>
```
## ERD

<img height="700" alt="image" src="https://user-images.githubusercontent.com/78121870/187648241-c2f22cb2-c1ac-4015-b64a-467808aa90cd.png">

## DETAIL OF PROJECT

### 로그인 페이지
<table>
  <tr>
  <td align="center">
       <img height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187644652-543d45a3-5e00-4085-94ca-228b1ad81751.png">
       </br> 
       <sub><b>로그인 페이지</b></sub>
      </a>
    </td>
    <td align="center">
       <img height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187645061-cb1bdb67-35d0-4c3a-a10d-8a5742ad7665.png">
       <br/> <sub><b>로그아웃 페이지</b><br></sub>
      </a>
    </td>
  </tr>
</table>




- oAuth 로그인과 테스트 유저로그인을 지원

### 메인 페이지
<img height="450" src="https://user-images.githubusercontent.com/78121870/187644501-6291ee7d-f9b5-44f6-9cb7-e57ec9f17b53.png">

- 무한 스크롤을 통해서 상품 목록을 볼 수 있음
- 동네를 바꿔서 다른 동네의 상품 목록을 볼 수 있음
- FAB클릭시 새글 작성 
- 좋아요 기능 `optimistic update`적용

### 글 작성 및 수정 

<table>
  <tr>
  <td align="center">
       <img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187645423-1f8c5aa4-7f4c-43f2-9e40-44fcdff59dd0.png">
       </br> 
       <sub><b>상품 글 작성 페이지</b></sub>
      </a>
    </td>
    <td align="center">
       <img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187331742-d5e05f38-da12-4fe2-b8d8-6f85562461b1.png">
       <br/> <sub><b>상품 글 수정 페이지</b><br></sub>
      </a>
    </td>
  </tr>
</table>


- s3에 이미지 업로드 기능
- input 유효성 검증 기능 

### 채팅 페이지 
<table>
  <tr>
  <td align="center">
       <img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187645632-2fd97836-c0b8-4163-ad5d-71b9d739b514.png">
       </br> 
       <sub><b>상품 글 작성 페이지</b></sub>
      </a>
    </td>
    <td align="center">
      <img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187332845-c188b2b8-444e-46ff-a3a4-eec69aa691fb.png">
       <br/> <sub><b>상품 글 수정 페이지</b><br></sub>
      </a>
    </td>
  </tr>
</table>

- Socket IO를 통해서 채팅

### 동네 검색 페이지 
<table>
  <tr>
  <td align="center">
<img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187333132-b716c0ff-ae9e-4287-b5cc-e39917e9038f.png">
       </br> 
       <sub><b>동네 선택 페이지</b></sub>
      </a>
    </td>
    <td align="center">
<img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187333185-ebee0e29-0bf8-4bb5-9c2c-b0de44f69060.png">
       <br/> <sub><b>동네 검색 페이지</b><br></sub>
      </a>
    </td>
  </tr>
</table>

- 검색을 통해 내 동네 추가
- 선택 동네 변경 가능 (내 동네 최대 두개까지 가능합니다.)


### 마이 페이지 
<table>
  <tr>
  <td align="center">
<img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187645951-e3326459-b402-40f3-9fcb-693bb06a2831.png">
       </br> 
       <sub><b>판매목록</b></sub>
      </a>
    </td>
    <td align="center">
<img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187646027-96e7d8d9-1651-46c3-80c5-8fc1827b6c40.png">
       <br/> <sub><b>채팅목록</b><br></sub>
      </a>
    </td>
        <td align="center">
<img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187646060-3a570d37-18af-474a-ae5c-44afdb2b5fe1.png">
       <br/> <sub><b>관심목록</b><br></sub>
      </a>
    </td>
  </tr>
</table>



