import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { API } from "./APIcategory";

export function GetHomeofferimage() {
  const Banner1 = async () => {
    const res = await axios.get(`${API}/fetch-home-banner?banner_type=8`);
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("bannerimages1", Banner1);
  return { data, error, isLoading };
}

export function GetBanner(limit = 3) {
  const Banner2 = async () => {
    const res = await axios.get(
      `${API}/fetch-home-banner?banner_type=9&limit=` + limit
    );
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("slideshow", Banner2);
  return { data, error, isLoading };
}

export function HomeBannerimage(limit = 1) {
  const Banner3 = async () => {
    const res = await axios.get(
      `${API}/fetch-home-banner?banner_type=10&limit=` + limit
    );

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("bannerimage3", Banner3);
  return { data, error, isLoading };
}

export function HomeBannerimage_3(limit = 1) {
  const Banner4 = async () => {
    const res = await axios.get(
      `${API}/fetch-home-banner?banner_type=11&limit=` + limit
    );

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("bannerimage4", Banner4);
  return { data, error, isLoading };
}

export function Bannerimage_split_last(limit = 2) {
  const Banner5 = async () => {
    const res = await axios.get(
      `${API}/fetch-home-banner?banner_type=12&limit=` + limit
    );

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("bannerimage5", Banner5);
  return { data, error, isLoading };
}

export function Subscription_Home(limit = 1) {
  const Banner6 = async () => {
    const res = await axios.get(
      `${API}/fetch-home-banner?banner_type=13&limit=` + limit
    );

    return res.data.data;
  };
  const {
    data: sub_home_banner,
    error: sub_home_bannererror,
    isLoading: sub_home_bannerisloding,
  } = useQuery("Subscription_Homebannerimage", Banner6);
  return { sub_home_banner, sub_home_bannererror, sub_home_bannerisloding };
}

export function Subscription_popup(limit = 1) {
  const Banner7 = async () => {
    const res = await axios.get(
      `${API}/fetch-home-banner?banner_type=14&limit=` + limit
    );

    return res.data.data;
  };
  const {
    data: sub_popup,
    error: sub_popup_bannererror,
    isLoading: sub_popup_bannerisloding,
  } = useQuery("Subscription_poupbannerimage", Banner7);
  return { sub_popup, sub_popup_bannererror, sub_popup_bannerisloding };
}

export function Logout_popup(limit = 1) {
  const Banner8 = async () => {
    const res = await axios.get(
      `${API}/fetch-home-banner?banner_type=15&limit=` + limit
    );
    // console.log(res.data.data,"data")
    return res.data.data;
  };
  const {
    data: logout_popup,
    error: logout_popup_bannererror,
    isLoading: logout_popup_bannerisloding,
  } = useQuery("logout_poupbannerimage", Banner8);
  return {
    logout_popup,
    logout_popup_bannererror,
    logout_popup_bannerisloding,
  };
}

//Meta social-home
export function MetaSocial_home() {
  const Metasocial = async () => {
    const res = await axios.get(`${API}/social-home`);
    // console.log(res.data.data,"data")
    return res.data.data;
  };
  const {
    data: meta_social_home,
    error: meta_social_homeerror,
    isLoading: meta_social_homeerrorisloding,
  } = useQuery("meta_social_home", Metasocial);
  return {
    meta_social_home,
    meta_social_homeerror,
    meta_social_homeerrorisloding,
  };
}

//header
export function Home_bg_Header() {
  const Banner16 = async () => {
    const res = await axios.get(`${API}/fetch-home-banner?banner_type=16&`);

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("banner16", Banner16);
  return { data, error, isLoading };
}
//body
export function Home_bg_Body() {
  const Banner17 = async () => {
    const res = await axios.get(`${API}/fetch-home-banner?banner_type=17&`);

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("banner17", Banner17);
  return { data, error, isLoading };
}
//Footer
export function Home_bg_Footer() {
  const Banner18 = async () => {
    const res = await axios.get(`${API}/fetch-home-banner?banner_type=18&`);

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("banner18", Banner18);
  return { data, error, isLoading };
}

{
  /*******************************New Home page banner******************************************* */
}
//Newhomemainbanner
export function Newhomemainbanner() {
  const Banner19 = async () => {
    const res = await axios.get(`${API}/fetch-home-banner?banner_type=19&`);

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("banner19", Banner19);
  return { data, error, isLoading };
}

//Categorybannernewhome1
export function Categorybannernewhome1() {
  const Banner20 = async () => {
    const res = await axios.get(`${API}/fetch-home-banner?banner_type=20`);

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("banner20", Banner20);
  return { data, error, isLoading };
}

//Categorybanner2newhome1
export function Categorybanner2newhome() {
  const Banner21 = async () => {
    const res = await axios.get(`${API}/fetch-home-banner?banner_type=21`);

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("banner21", Banner21);
  return { data, error, isLoading };
}

//lastbannerbanner2newhome1
export function Newhomebannerlast() {
  const Banner22 = async () => {
    const res = await axios.get(`${API}/fetch-home-banner?banner_type=22`);

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("banner22", Banner22);
  return { data, error, isLoading };
}

//newhome1middilebanner
export function Newhome1middilebanner() {
  const Banner23 = async () => {
    const res = await axios.get(`${API}/fetch-home-banner?banner_type=23`);

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("banner23", Banner23);
  return { data, error, isLoading };
}
