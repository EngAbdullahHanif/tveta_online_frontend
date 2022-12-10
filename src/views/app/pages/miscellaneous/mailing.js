/* eslint-disable react/no-danger */
import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {
	Separator,
	Colxx,
} from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const Mailing = ({ match }) => {
	return (
		<>
			<Row>
				<Colxx xxs="12">
					<Breadcrumb heading="menu.mailing" match={match} />
					<Separator className="mb-5" />
				</Colxx>
			</Row>
			<Row>
				<Colxx xxs="12" className="mb-4">
					<Card className="mb-5">
						<CardBody>
							<IntlMessages id="pages.mailing-info" />
						</CardBody>
					</Card>

					<div
						className="content"
						dangerouslySetInnerHTML={{
							__html: `
                    <div leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="height:auto !important;width:100% !important; font-family: yekan,Arial,sans-serif !important; margin-bottom: 40px;">
                    <center>
                        <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff;border:1px solid #e4e2e2;border-collapse:separate !important; border-radius:4px;border-spacing:0;color:#242128; margin:0;padding:40px;"
                            heigth="auto">
                            <tbody>
                                <tr>
                                    <td align="left" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                                        <img src="https://coloredstrategies.com/mailing/gogo.png" />
                                    </td>
                                    <td align="right" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                                        <span style="color: #8f8f8f; font-weight: normal; line-height: 2; font-size: 14px;">4 مرداد 1400</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style="padding-top:10px;border-top:1px solid #e4e2e2">
                                        <h3 style="color:#303030; font-size:18px; line-height: 1.6; font-weight:500;">بیا یادگیری رو شروع کنیم</h3>
                                        <p style="color:#8f8f8f; font-size: 14px; padding-bottom: 20px; line-height: 1.4;">
																				لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                        </p>
                                        <h3 style="color:#303030; font-size:18px; line-height: 1.6; font-weight:500;">کد احراز هویت</h3>
                                        <p style="background-color:#f1f1f1; padding: 8px 15px; border-radius: 50px; display: inline-block; margin-bottom:20px; font-size: 14px;  line-height: 1.4; font-family: yekan, Courier, monospace; margin-top:0">148
                                            544 174</p>
            
                                        <h3 style="color:#303030; font-size:18px; line-height: 1.6; font-weight:500;">گام هایی که باید دنبال کنی</h3>
                                        <ol style="color:#8f8f8f; font-size: 14px; padding-bottom: 20px; padding-left:20px; line-height: 1.6">
                                            <li>مورد گزینه اول</li>
                                            <li>مورد تستی در گزینه سوم</li>
                                            <li>مورد واقعا تستی در گزینه چهارم</li>
                                            <li>یک مورد همینجوری الکی توی گزینه پنجم</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-collapse:collapse;">
                                            <tbody>
                                                <tr>
                                                    <td style="padding:15px 0px;" valign="top" align="center">
                                                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate !important;">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" valign="middle" style="padding:13px;">
                                                                        <a href="#" title="START NOW" target="_blank" style="font-size: 14px; line-height: 1.5; font-weight: 700; letter-spacing: 1px; padding: 15px 40px; text-align:center; text-decoration:none; color:#FFFFFF; border-radius: 50px; background-color:#922c88;">همین حالا شروع کن</a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin-top:30px; padding-bottom:20px;; margin-bottom: 40px;">
                            <tbody>
                                <tr>
                                    <td align="center" valign="center">
                                        <p style="font-size: 12px; text-decoration: none;line-height: 1; color:#909090; margin-top:0px; margin-bottom:5px; ">
                                           ایران، تهران، شرکت فناوری اطلاعات
                                        </p>
                                        <p style="font-size: 12px; line-height:1; color:#909090;  margin-top:5px; margin-bottom:5px;">
                                            <a href="#" style="color: #922c88; text-decoration:none;">حریم خصوصی</a>
                                            | <a href="#" style="color: #922c88; text-decoration:none;">لغو عضویت خبرنامه</a>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </div>
            
                <div leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="height:auto !important;width:100% !important; font-family: yekan,Arial,sans-serif !important;">
                    <center>
                        <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff;border:1px solid #e4e2e2;border-collapse:separate !important; border-radius:4px;border-spacing:0;color:#242128; margin:0;padding:40px;"
                            heigth="auto">
                            <tbody>
                                <tr>
                                    <td align="left" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                                        <img src="https://coloredstrategies.com/mailing/gogo.png" />
                                    </td>
                                    <td align="right" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                                        <span style="color: #8f8f8f; font-weight: normal; line-height: 2; font-size: 14px;">4 مرداد 1400</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style="padding-top:10px; border-top:1px solid #e4e2e2">
                                        <table>
                                            <tr>
                                                <td colSpan="2" style="padding-bottom:20px;">
                                                    <h3 style="color:#303030; font-size:18px; line-height: 1.6; font-weight:500;">جمع سفارشات</h3>
                                                    <p style="color:#8f8f8f; font-size: 14px; padding-bottom: 20px; line-height: 1.4; margin-bottom:0;">
																										لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top:0px; padding-bottom:20px; width:140px ">
                                                    <img src="https://coloredstrategies.com/mailing/product-1.jpg" style="width: 113px; height: 85px; object-fit: cover; border-radius: 3px; " />
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:20px;">
                                                    <h4 style="font-size: 16px; line-height: 1; margin-bottom:20px;"><a href="#"
                                                            style="text-decoration: none; color:#303030; font-weight:500;">کیک هویج</a></h4>
                                                    <p href="#" style="font-size: 12px; text-decoration: none; line-height: 1; color:#909090; margin-top:0px; margin-bottom:0;">3
                                                        عدد</p>
                                                    <p style="font-size: 12px; line-height: 1; color:#909090; margin-top:5px;">پکیج معمولی</p>
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:20px; text-align: right;">
                                                    <p style="font-size: 13px; line-height: 1; color:#922c88;  margin-top:5px; vertical-align:top; white-space:nowrap;">
                                                        14.82 تومن</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" style="border-top:1px solid #e4e2e2">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top:0px; padding-bottom:20px; width:140px ">
                                                    <img src="https://coloredstrategies.com/mailing/product-2.jpg" style="width: 113px; height: 85px; object-fit: cover; border-radius: 3px; " />
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:20px;">
                                                    <h4 style="font-size: 16px; line-height: 1; margin-bottom:20px;"><a href="#"
                                                            style="text-decoration: none; color:#303030; font-weight:500;">کیک شکلاتی</a></h4>
                                                    <p href="#" style="font-size: 12px; text-decoration: none; line-height: 1; color:#909090; margin-top:0px; margin-bottom:0;">2
                                                        عدد</p>
                                                    <p style="font-size: 12px; line-height: 1; color:#909090; margin-top:5px;">پکیج معمولی</p>
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:20px; text-align: right;">
                                                    <p style="font-size: 13px; line-height: 1; color:#922c88;  margin-top:5px; vertical-align:top; white-space:nowrap;">
                                                        4.24 تومن</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" style="border-top:1px solid #e4e2e2">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top:0px; padding-bottom:20px; width:140px ">
                                                    <img src="https://coloredstrategies.com/mailing/product-3.jpg" style="width: 113px; height: 85px; object-fit: cover; border-radius: 3px; " />
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:20px;">
                                                    <h4 style="font-size: 16px; line-height: 1; margin-bottom:20px;"><a href="#"
                                                            style="text-decoration: none; color:#303030; font-weight:500;">فت راسکال</a></h4>
                                                    <p href="#" style="font-size: 12px; text-decoration: none; line-height: 1; color:#909090; margin-top:0px;  margin-bottom:0;">1
                                                        عدد</p>
                                                    <p style="font-size: 12px; line-height: 1; color:#909090; margin-top:5px;">پکیج معمولی</p>
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:20px; text-align: right;">
                                                    <p style="font-size: 13px; line-height: 1; color:#922c88;  margin-top:5px; vertical-align:top; white-space:nowrap;">
                                                        12.91 تومن</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" style="border-top:1px solid #e4e2e2">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top:0px; padding-bottom:20px; width:140px ">
                                                    <img src="https://coloredstrategies.com/mailing/product-4.jpg" style="width: 113px; height: 85px; object-fit: cover; border-radius: 3px; " />
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:20px;">
                                                    <h4 style="font-size: 16px; line-height: 1; margin-bottom:20px;"><a href="#"
                                                            style="text-decoration: none; color:#303030; font-weight:500;">کیک کریسمس</a></h4>
                                                    <p href="#" style="font-size: 12px; text-decoration: none; line-height: 1; color:#909090; margin-top:0px; margin-bottom:0;">4
                                                        عدد</p>
                                                    <p style="font-size: 12px; line-height: 1; color:#909090; margin-top:5px;">پکیج معمولی</p>
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:20px; text-align: right;">
                                                    <p style="font-size: 13px; line-height: 1; color:#922c88;  margin-top:5px; vertical-align:top; white-space:nowrap;">
                                                        54.20 تومن</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" style="border-top:1px solid #e4e2e2">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                                                    <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top;  margin-bottom: 0;">جمع کل:&nbsp;</p>
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                                                    <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#922c88; white-space:nowrap; margin-bottom: 0;">
                                                        124.20 تومن</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                                                    <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top; margin-bottom: 0;">باربری:&nbsp;</p>
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                                                    <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#922c88; white-space:nowrap; margin-bottom: 0;">
                                                        4.04 تومن</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                                                    <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top; margin-bottom: 0;">مالیات:&nbsp;</p>
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                                                    <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#922c88; white-space:nowrap; margin-bottom: 0;">
                                                        9.14 تومن</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                                                    <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top; margin-bottom: 0;"><strong> کل:&nbsp;</strong></p>
                                                </td>
                                                <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                                                    <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#922c88; white-space:nowrap; margin-bottom: 0;"><strong>
                                                            137.38 تومن</strong></p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
            
                        <table style="margin-top:30px; padding-bottom:20px; margin-bottom: 40px;">
                            <tbody>
                                <tr>
                                    <td align="center" valign="center">
                                        <p style="font-size: 12px; text-decoration: none;line-height: 1; color:#909090; margin-top:0px; margin-bottom:5px; ">
                                            ایران، تهران، شرکت فناوری اطلاعات
                                        </p>
                                        <p style="font-size: 12px; line-height:1; color:#909090;  margin-top:5px; margin-bottom:5px;">
                                            <a href="#" style="color: #922c88; text-decoration:none;">حریم خصوصی</a>
                                            | <a href="#" style="color: #922c88; text-decoration:none;">لغو خبرنامه</a>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </div>
            
                <div leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="height:auto !important;width:100% !important; font-family: yekan,Arial,sans-serif !important;">
                    <center>
                        <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff;border:1px solid #e4e2e2;border-collapse:separate !important; border-radius:4px;border-spacing:0;color:#242128; margin:0;padding:40px;"
                            heigth="auto">
                            <tbody>
                                <tr>
                                    <td align="left" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                                        <img src="https://coloredstrategies.com/mailing/gogo.png" />
                                    </td>
                                    <td align="right" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                                        <span style="color: #8f8f8f; font-weight: normal; line-height: 2; font-size: 14px;">4 مرداد 1400</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style="padding-top:10px;border-top:1px solid #e4e2e2">
                                        <table>
                                            <tr>
                                                <td style="padding-bottom:20px;">
                                                    <h3 style="color:#303030; font-size:18px; line-height: 1.6; font-weight:500;">آخرین های بلاگ</h3>
                                                    <p style="color:#8f8f8f; font-size: 14px; padding-bottom: 20px; line-height: 1.4;">
																										کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 30px;">
                                                    <a href="#">
                                                        <img style="max-width: 100%; object-fit: cover; border-radius: 3px; margin-bottom:5px;"
                                                            src="https://gogo-react.coloredstrategies.com/img/carousels/1.jpg" />
                                                    </a>
                                                    <h4 style="font-size: 16px; line-height: 1; margin-bottom:5px; margin-top: 10px;"><a
                                                            href="#" style="text-decoration: none; color:#303030; font-weight:500;">عاقبت خرید گوشی آیفون اینترنتی ارزان!</a></h4>
                                                    <p style="color:#8f8f8f; font-size: 14px; line-height: 1.4; margin-top:10px">
                                                        ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
                                                    </p>
                                                    <p style="font-size: 14px; line-height: 1; margin-top:5px;"><a style="color:#922c88; text-decoration:initial;"
                                                            href="#">خواندن
                                                            بیشتر</a></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" style="border-top:1px solid #e4e2e2; padding-bottom:10px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 30px;">
                                                    <a href="#">
                                                        <img style="max-width: 100%; object-fit: cover; border-radius: 3px; margin-bottom:5px;"
                                                            src="https://gogo-react.coloredstrategies.com/img/carousels/2.jpg" />
                                                    </a>
                                                    <h4 style="font-size: 16px; line-height: 1; margin-bottom:5px; margin-top: 10px;"><a
                                                            href="#" style="text-decoration: none; color:#303030; font-weight:500;">حقایقی راجع به گربه‌ها که شاید نمی‌دانستید!</a></h4>
                                                    <p style="color:#8f8f8f; font-size: 14px; line-height: 1.4; margin-top:10px">
                                                        ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
                                                    </p>
                                                    <p style="font-size: 14px; line-height: 1; margin-top:5px;"><a style="color:#922c88; text-decoration:initial;"
                                                            href="#">خواندن
                                                            بیشتر</a></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" style="border-top:1px solid #e4e2e2; padding-bottom:10px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="#">
                                                        <img style="max-width: 100%; object-fit: cover; border-radius: 3px; margin-bottom:5px;"
                                                            src="https://gogo-react.coloredstrategies.com/img/carousels/3.jpg" />
                                                    </a>
                                                    <h4 style="font-size: 16px; line-height: 1; margin-bottom:5px; margin-top: 10px;"><a
                                                            href="#" style="text-decoration: none; color:#303030; font-weight:500;">مسدود شدن اتوبان توسط قایق تفریحی!</a></h4>
                                                    <p style="color:#8f8f8f; font-size: 14px; line-height: 1.4; margin-top:10px">
                                                        ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
                                                    </p>
                                                    <p style="font-size: 14px; line-height: 1; margin-top:5px;"><a style="color:#922c88; text-decoration:initial;"
                                                            href="#">خواندن
                                                            بیشتر</a></p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
            
                        <table style="margin-top:30px; padding-bottom:20px; margin-bottom: 40px;">
                            <tbody>
                                <tr>
                                    <td align="center" valign="center">
                                        <p style="font-size: 12px; text-decoration: none;line-height: 1; color:#909090; margin-top:0px; margin-bottom:5px; ">
                                            ایران، تهران، شرکت فناوری اطلاعات
                                        </p>
                                        <p style="font-size: 12px; line-height:1; color:#909090;  margin-top:5px; margin-bottom:5px;">
                                            <a href="#" style="color: #922c88; text-decoration:none;">حریم خصوصی</a>
                                            | <a href="#" style="color: #922c88; text-decoration:none;">لغو خبرنامه</a>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </div>
                    `,
						}}
					/>
				</Colxx>
			</Row>
		</>
	);
};
export default Mailing;
