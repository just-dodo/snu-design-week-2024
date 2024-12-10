import * as React from 'react'

import { normalizeUrl } from 'notion-utils'
import { ImageState, LazyImageFull } from 'react-lazy-images'

import { useNotionContext } from '../context'
import { cs } from '../utils'

/**
 * Progressive, lazy images modeled after Medium's LQIP technique.
 */
export const LazyImage: React.FC<{
  src?: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  height?: number
  width?: number
  zoomable?: boolean
  priority?: boolean
}> = ({
  src,
  alt,
  className,
  style,
  zoomable = false,
  priority = false,
  height,
  width,
  ...rest
}) => {

    // if style has objectFit, pop it out
    const { objectFit, ...restStyle } = style || {}
    // add className object-{objectFit} if objectFit is set
    const objectFitClassName = objectFit ? `notion-object-${objectFit}` : ''
    const addClassname = cs(objectFitClassName, className);

    const { recordMap, zoom, previewImages, forceCustomImages, components } =
      useNotionContext()

    const zoomRef = React.useRef(zoom ? zoom.clone() : null)
    const previewImage = previewImages
      ? recordMap?.preview_images?.[src!] ??
      recordMap?.preview_images?.[normalizeUrl(src)]
      : null

    const onLoad = React.useCallback(
      (e: any) => {
        if (zoomable && (e.target.src || e.target.srcset)) {
          if (zoomRef.current) {
            ; (zoomRef.current as any).attach(e.target)
          }
        }
      },
      [zoomRef, zoomable]
    )

    const attachZoom = React.useCallback(
      (image: any) => {
        if (zoomRef.current && image) {
          ; (zoomRef.current as any).attach(image)
        }
      },
      [zoomRef]
    )

    const attachZoomRef = React.useMemo(
      () => (zoomable ? attachZoom : undefined),
      [zoomable, attachZoom]
    )

    if (previewImage) {
      const aspectRatio = (height ? height : previewImage.originalHeight) / (width ? width : previewImage.originalWidth)

      if (components.Image) {
        return (
          <components.Image
            src={src}
            alt={alt}
            style={{
              ...restStyle,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
            className={addClassname}
            width={width}
            height={height}
            blurDataURL={previewImage.dataURIBase64}
            placeholder="blur"
            priority={priority}
            onLoad={onLoad}
          />
        );
      }

      return (
        <LazyImageFull src={src} {...rest} experimentalDecode={true}>
          {({ imageState, ref }) => {
            const isLoaded = imageState === ImageState.LoadSuccess
            const wrapperStyle: React.CSSProperties = {
              width: '100%',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }
            const imgStyle: React.CSSProperties = {
              willChange: 'opacity',
            }

            if (height) {
              wrapperStyle.height = height
            } else {
              imgStyle.position = 'absolute'
              wrapperStyle.paddingBottom = `${aspectRatio * 100}%`
            }

            return (
              <div
                className={cs(
                  "lazy-image-wrapper",
                  isLoaded && "lazy-image-loaded",
                  addClassname
                )}
                style={wrapperStyle}
              >
                <img
                  className="lazy-image-preview"
                  src={previewImage.dataURIBase64}
                  alt={alt}
                  ref={ref}
                  style={{
                    ...restStyle,
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}
                  decoding="async"
                />

                <img
                  className="lazy-image-real"
                  src={src}
                  alt={alt}
                  ref={attachZoomRef}
                  style={{
                    ...restStyle,
                    ...imgStyle,
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}
                  width={width}
                  height={height}
                  decoding="async"
                  loading="lazy"
                />
              </div>
            );
          }}
        </LazyImageFull>
      )
    } else {
      if (components.Image && forceCustomImages) {
        return (
          <components.Image
            src={src}
            alt={alt}
            className={addClassname}
            style={{
              ...restStyle,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
            width={width || null}
            height={height || null}
            priority={priority}
            onLoad={onLoad}
          />
        );
      }

      // Default image element
      return (
        <img
          className={addClassname}
          style={{
            ...restStyle,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          src={src}
          alt={alt}
          ref={attachZoomRef}
          loading="lazy"
          decoding="async"
          {...rest}
        />
      );
    }
  }
