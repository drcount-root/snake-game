import Script from "next/script";

const GoogleTag = () => {
  const id = "G-DVXSCKNET4";

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
};

export default GoogleTag;
