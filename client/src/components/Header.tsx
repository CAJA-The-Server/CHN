import styles from "../styles/Header.module.scss";

import { FC, useCallback, useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CategoryContext } from "../contexts/category-context";
import { CurrentUserContext } from "../contexts/current-user-context";
import { signout } from "../services/auth-service";
import { getDateTime } from "../utils/time";
import { Logo } from "./Logo";

export const Header: FC = () => {
  const currentUser = useContext(CurrentUserContext);
  const categories = useContext(CategoryContext);

  const navigate = useNavigate();

  const [dateTime, dateString] = useMemo(() => {
    const date = new Date();
    const dateTime = getDateTime(date);
    const dateString = date.toDateString();
    return [dateTime, dateString];
  }, []);

  const handleSignout = useCallback(async () => {
    await signout();
    navigate("/");
    navigate(0);
  }, [navigate]);

  return (
    <header className={styles.container}>
      <div>
        <time className={styles.time} dateTime={dateTime}>
          {dateString}
        </time>
      </div>
      <div className={styles.headline}>
        <Link className={styles.logo} to="/">
          <div>
            <Logo />
          </div>
          <div>
            <span>CHN</span>
            <span>Cheonan Jungang High School News</span>
          </div>
        </Link>
        <nav className={styles["category-nav"]}>
          {categories !== undefined && (
            <>
              <Link className={styles["nav-button"]} to="/articles">
                전체
              </Link>
              <Link className={styles["nav-button"]} to="/articles?category=">
                카테고리 없음
              </Link>
              {categories.map(({ name: category }) => (
                <Link
                  key={category}
                  className={styles["nav-button"]}
                  to={`/articles?category=${category}`}
                >
                  {category}
                </Link>
              ))}
            </>
          )}
        </nav>
        <nav className={styles["user-nav"]}>
          {currentUser !== undefined &&
            (currentUser !== null ? (
              <>
                <Link className={styles["nav-button"]} to="/myaccount">
                  {currentUser.name}
                </Link>
                <button
                  className={styles["nav-button"]}
                  onClick={handleSignout}
                >
                  로그아웃
                </button>
                <Link className={styles["nav-button"]} to="/myarticles">
                  내 기사
                </Link>
              </>
            ) : (
              <>
                <Link className={styles["nav-button"]} to="/signup">
                  회원가입
                </Link>
                <Link className={styles["nav-button"]} to="/signin">
                  로그인
                </Link>
              </>
            ))}
        </nav>
        <figure className={styles["caja-mark"]}>
          <img src="/caja-symbol.jpg" alt="천안중앙고심볼" />
          <figcaption>
            천안중앙
            <br />
            56대 학생회
          </figcaption>
        </figure>
      </div>
    </header>
  );
};
