/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/pages/SingleLightbox';
import VideoPlayer from 'components/common/VideoPlayer';
import { blogData, blogCategories } from 'data/blog';
import IntlMessages from 'helpers/IntlMessages';

const recentPosts = blogData.slice(0, 4);
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const BlogDetail = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.blog-detail" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
      <Colxx xxs="12" md="12" xl="8" className="col-left">
          <Card className="mb-4">
            <SingleLightbox
              thumb="/assets/img/details/5.jpg"
              large="/assets/img/details/5.jpg"
              className="responsive border-0 card-img-top mb-3"
            />
            <CardBody>
              <div className="mb-5">
                <h5 className="card-title">تزئین کاپ کیک به شکل گل آفتابگردان</h5>
                <p>
                خیلی وقتا میشه که برای مهمونی ها و یا جشن های کوچیکمون کیک و کاپ کیک می پزیم و دلمون می خواد اونها رو تزیین کنیم تا جذاب تر بشن و از سادگی دربیان. گاهی ممکنه فکر کنید تزیین کردن کیک و کار با قیف و ماسوره های مختلف کار سختیه. ولی من در این مطلب آموزش گام به گام تزیین کاپ کیک به شکل گل آفتاب گردون رو براتون قرار دادم که هم خیلی زیباست و هم خیلی ساده، حتی اگه تازه کار هم باشید و تا حالا از قیف برای تزیین کیک هاتون استفاده نکرده باشید، به راحتی از پسش برمیاد. در ادامه مطلب همراهمون باشید.
                </p>
                <p>
                اول از همه باید کاپ کیک هاتون رو بپزید و اجازه بدید که کاملا سرد بشن، برای تهیه کاپ کیک میتونید از پودر کاپ کیک های آماده استفاده کنید و یا خودتون کاپ کیک شکلاتی و یا کاکائویی مورد نظرتون رو بپزید.
                </p>
              </div>
              <div className="mb-5">
                <h5 className="card-title">مواد لازم</h5>
                <ul className="list-unstyled">
                  <li>کاپ کیک شکلاتی</li>
                  <li>بیسکویت شکلاتی گرد</li>
                  <li>شکلات تخته ای</li>
                  <li>چیپس شکلات</li>
                  <li>فراستینگ</li>
                  <li>رنگ خوراکی زرد، نارنجی و سبز</li>
                </ul>
              </div>
              <div>
                <h5 className="card-title">مراحل تزئین</h5>
                <p>
                اول از همه باید کاپ کیک هاتون رو بپزید و اجازه بدید که کاملا سرد بشن، برای تهیه کاپ کیک میتونید از پودر کاپ کیک های آماده استفاده کنید و یا خودتون کاپ کیک شکلاتی و یا کاکائویی مورد نظرتون رو بپزید.
                </p>
                <p>
                مقدار کمی از شکلات تخته ای رو ذوب کنید، ما برای هر کاپ کیک به یک قاشق غذاخوری شکلات ذوب شده نیاز داریم. بهتره که شکلات رو به شیوه ی صحیح تمپر کنید..
                </p>
                <p>
                از بیسکویت های شکلاتی گرد و کرمدار استفاده کنید. بهترین گزینه بیسکویت اوریو هست که نمونه های ایرانیش هم در بازار زیاده. یک قاشق از شکلات ذوب شده رو روی بیسکویت بریزید.
                </p>
                <p>
                شکلات های چیپسی ریز رو روی شکلات مذابی که روی بیسکویت ریختید بریزید تا کاملا سطح بیسکویت رو بپوشونه. برای هر کاپ کیک به یک دونه از اینها نیاز دارید. پس این ها رو به تعداد مورد نظرتون درست کنید و در یخچال قرار بدید تا شکلات های مذاب کاملا سفت بشن و خودشون رو بگیرن و چیپس های شکلاتی روی بیسکویت ها محکم بچسبن.
                </p>
                <p>
                ما به دو تا رنگ خامه یا هر کرم دیگه ای که برای تزئین انتخاب کردید، نیاز داریم؛ زرد طلایی و سبز. برای تهیه رنگ زرد طلایی از رنگ خوراکی زرد و کمی نارنجی استفاده کنید. حواستون باشه که رنگ رو کم کم اضافه کنید و هم بزنید تا به رنگ مورد نظرتون برسید.
                </p>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" md="12" xl="4" className="col-left">
          <Card className="mb-4">
            <CardBody className="p-0">
              <VideoPlayer
                autoplay={false}
                controls
                controlBar={{
                  pictureInPictureToggle: false,
                }}
                className="video-js side-bar-video card-img-top"
                poster="/assets/img/video/poster.jpg"
                sources={[
                  {
                    src: 'https://github.com/bower-media-samples/big-buck-bunny-1080p-60fps-30s/raw/master/video.mp4',
                    type: 'video/mp4',
                  },
                ]}
              />
            </CardBody>
            <CardBody>
              <p className="list-item-heading mb-4">
                طرز پخت کیک هندونه برای شب یلدا
              </p>
              <footer>
                <p className="text-muted text-small mb-0 font-weight-light">
                  27 مرداد 1400
                </p>
              </footer>
            </CardBody>
          </Card>
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="pages.recent-posts" />
              </CardTitle>
              {recentPosts.map((blogItem, index) => {
                return (
                  <div
                    className={`d-flex flex-row ${
                      index === recentPosts.length - 1 ? '' : 'mb-3'
                    }`}
                    key={index}
                  >
                    <div>
                      <NavLink to="#" location={{}}>
                        <img
                          src={blogItem.thumb}
                          alt="img caption"
                          className="list-thumbnail border-0"
                        />
                      </NavLink>
                    </div>
                    <div className="pl-3 pt-2 list-item-heading-container">
                      <NavLink to="#" location={{}}>
                        <ResponsiveEllipsis
                          className="list-item-heading"
                          text={blogItem.title}
                          maxLine="3"
                          trimRight
                          basedOn="words"
                          component="h5"
                        />
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="todo.categories" />
              </CardTitle>
              {blogCategories.map((categoryItem, index) => {
                return (
                  <div
                    className="d-flex flex-row align-items-center mb-3"
                    key={`blogItem${index}`}
                  >
                    <NavLink to={categoryItem.link}>
                      <i
                        className={`large-icon initial-height ${categoryItem.icon}`}
                      />
                    </NavLink>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                      <NavLink to={categoryItem.link}>
                        <p className="list-item-heading mb-1">
                          {categoryItem.title}
                        </p>
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default BlogDetail;
